from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Bot,
    ChatGPTInfo,
    ChatPage,
    Conversation,
    ExperimentalCondition,
    Message,
)

# Register your models here.
admin.site.register(ChatGPTInfo)
admin.site.register(Bot)
admin.site.register(ExperimentalCondition)
admin.site.register(Message)


@admin.register(ChatPage)
class ChatPageAdmin(admin.ModelAdmin):
    list_display = ("slug", "bot")


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("chat_page", "modified", "number_of_messages")
    readonly_fields = ("uuid", "external_id")

    def number_of_messages(self, obj):
        return obj.messages.count()
