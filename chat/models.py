import logging
import uuid
from datetime import datetime, timedelta

import openai
from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings
from django.db.models.query import QuerySet
from django_extensions.db.models import TimeStampedModel
from django.http import HttpResponse
from django.utils.text import slugify

import csv
import xml.etree.ElementTree as ET


User = get_user_model()

logger = logging.getLogger(__name__)


class ChatGPTInfo(models.Model):
    """Connection information for ChatGPT"""

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, blank=True, null=True)
    token = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        if self.description:
            return f"{self.owner}'s ChatGPT Info: {self.description}"
        return f"{self.owner}'s ChatGPT Info"


class Bot(TimeStampedModel):
    """Bots that users will chat with"""

    name = models.CharField(max_length=200)
    display_name = models.CharField(max_length=200, blank=True)
    model_choices = [
        ("gpt-4o-mini", "GPT-4o Mini (new and cheap)"),
        ("gpt-4o", "GPT-4o (newest)"),
        ("gpt-4-turbo", "GPT-4 Turbo"),
        ("gpt-4", "GPT-4"),
        ("gpt-3.5-turbo", "GPT-3.5 Turbo"),
        ("gpt-4-0613", "GPT-4-0613"),
        ("gpt-4-32k", "GPT-4-32k"),
        ("gpt-4-32k-0613", "GPT-4-32k-0613"),
        ("gpt-3.5-turbo-0613", "GPT-3.5 Turbo-0613"),
        ("gpt-3.5-turbo-16k", "GPT-3.5 Turbo-16k"),
        ("gpt-3.5-turbo-16k-0613", "GPT-3.5 Turbo-16k-0613"),
    ]
    model = models.CharField(max_length=200, choices=model_choices)
    connection = models.ForeignKey(ChatGPTInfo, on_delete=models.CASCADE)
    max_tokens = models.IntegerField(
        default=0, verbose_name="Max tokens per message (0 for unlimited)"
    )
    system_message = models.TextField(
        blank=True, null=True, verbose_name="System message (optional)"
    )
    bot_initiates = models.BooleanField(
        default=True, verbose_name="Does the bot initiate the conversation?"
    )

    def __str__(self):
        return f"{self.name}, a {self.model} bot"


class ExperimentalCondition(TimeStampedModel):
    description = models.TextField(blank=True)
    typing_indicator = models.BooleanField(default=False)
    typing_delay = models.IntegerField(default=0, help_text="Delay in milliseconds")
    avatar = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.description if self.description else "No description found"


class ChatPage(TimeStampedModel):
    experimental_condition = models.ForeignKey(
        ExperimentalCondition, on_delete=models.CASCADE
    )
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE, related_name="chat_pages")
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=200, null=True, blank=True, unique=True)
    disclaimer = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.slug if self.slug else f"Chat with {self.bot}"


class Conversation(TimeStampedModel):
    chat_page = models.ForeignKey(
        ChatPage, on_delete=models.DO_NOTHING, related_name="conversations"
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    # for Qualtrics or other external IDs
    external_id = models.CharField(max_length=200, blank=True, null=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return (
            f"Conversation between {self.user} & {self.chat_page.bot}, "
            f"last updated {self.modified}"
        )

    @property
    def openai_formatted_messages(self):
        messages: QuerySet[Message] = self.messages.all()
        formatted_messages = []
        for message in messages:
            formatted_messages.append(
                {
                    "role": message.actor,
                    "content": message.text,
                }
            )
        return formatted_messages

    def send_message(self, text=None):
        """Sends a message to the bot and returns the bot's response"""
        openai.api_key = self.chat_page.bot.connection.token
        max_tokens = self.chat_page.bot.max_tokens
        if max_tokens == 0:
            max_tokens = None
        if text:
            Message.objects.create(conversation=self, text=text, actor="user")
        response = openai.ChatCompletion.create(
            model=self.chat_page.bot.model,
            messages=self.openai_formatted_messages,
            max_tokens=max_tokens if max_tokens and max_tokens > 0 else 500,
            temperature=0.7,
            top_p=0.9,
        )
        logger.info(f"OpenAI API call: user={self.user.id}, bot={self.chat_page.bot.id}")
        Message.objects.create(
            conversation=self,
            text=response.choices[0].message.content,
            actor="assistant",
        )
        return self.messages.last()

    def save(self, *args, **kwargs):
        if not self.pk:
            # For new conversations
            self.slug = slugify(f"chat-{self.bot.name}-{uuid.uuid4()}")
            super().save(*args, **kwargs)
            if self.chat_page.bot.system_message:
                Message.objects.create(
                    conversation=self,
                    text=self.chat_page.bot.system_message,
                    actor="system",
                )
            if self.chat_page.bot.bot_initiates:
                self.send_message()
        else:
            super().save(*args, **kwargs)


class Message(TimeStampedModel):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    text = models.TextField()

    class Actors(models.TextChoices):
        USER = "user", "User"
        BOT = "assistant", "Assistant"
        SYSTEM = "system", "System"

    actor = models.CharField(max_length=10, choices=Actors.choices)

    def save(self, *args, **kwargs):
        # TODO Consider updating this to also update the conversation's modified date
        super().save(*args, **kwargs)
        self.conversation.save()

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return f"{self.actor}: {self.text}"
    
#adding dashboard element
class UsageLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    bot = models.ForeignKey("Bot", on_delete=models.CASCADE, db_index=True)
    request_data = models.JSONField()
    response_data = models.JSONField()
    metadata = models.JSONField(null=True, blank=True)  # Extra info storage
   

    def __str__(self):
        return f"{self.user} - {self.action} at {self.timestamp}"
    
   