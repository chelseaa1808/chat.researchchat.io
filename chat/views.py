import json
import logging
import csv
import xml.etree.ElementTree as ET
from .models import UsageLog

from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import xframe_options_exempt
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView




from .chat import send_message
from .models import Bot, ChatPage, Conversation, Message
from .serializers import (
    ChatPageConversationSerializer,
    ChatPageSerializer,
    ConversationSerializer,
    MessageSerializer,
    BotSerializer
)

logger = logging.getLogger(__name__)


def chat_landing_page(request, slug):
    chat_page = get_object_or_404(ChatPage, slug=slug)
    
    # Create a new conversation and redirect to the conversation page
    conversation, created = Conversation.objects.get_or_create(chat_page=chat_page, user=request.user if request.user.is_authenticated else None)
    conversation.chat_page = chat_page
    # TODO Set up the user information so that logged-in users get chats attached to them
    # TODO Also make it so that a logged-in user who has an existing chat gets redirected
    #  to that rather than starting a new one
    conversation.save()

    return redirect(
        reverse(
            "chat:conversation",
            kwargs={"slug": slug, "conversation_uuid": conversation.uuid},
        )
    )
    # return HttpResponse(f"This is the page for {slug}")   

def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})

@xframe_options_exempt  # This allows embedding for this specific view
def my_embeddable_view(request):
    return HttpResponse("This page can be embedded in an iframe.")

def conversation_page(request, slug, conversation_uuid):
    """Where the magic happens"""
    chat_page = get_object_or_404(ChatPage, slug=slug)
    conversations = Conversation.objects.filter(chat_page=chat_page)
    view_only = True if request.GET.get("view-only", False) else False
    conversation = get_object_or_404(conversations, uuid=conversation_uuid)
    return render(
        request,
        template_name="chat/chat_room.html",
        context={"conversation": conversation, "view_only": view_only},
    )


@api_view(("POST",))
@renderer_classes((JSONRenderer,))
# @csrf_exempt
def send_chat_message(request):
    if request.method == "POST":
        body = json.loads(request.body)
        user_message_text = body["text"]
        conversation_uuid = body["conversation_id"]

        conversation = get_object_or_404(Conversation, uuid=conversation_uuid)
        reply = conversation.send_message(user_message_text)

        serializer = MessageSerializer(reply)
        return Response(serializer.data)


class ChatPageViewSet(viewsets.ModelViewSet):
    queryset = ChatPage.objects.all().prefetch_related("bot", "experimental_condition")
    serializer_class = ChatPageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all().prefetch_related("messages", "chat_page")
    lookup_field = "uuid"
    serializer_class = ConversationSerializer


# class ConversationSubClassFieldsMixin(object):
#     def get_queryset(self):
#         return Conversation.objects.select_subclasses()


class GetConversation(APIView):
    def get(self, request, *args, **kwargs):
        conversation = get_object_or_404(Conversation, uuid=kwargs["uuid"])
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)

    queryset = Conversation.objects.all().prefetch_related("messages", "chat_page")
    serializer_class = ConversationSerializer
    lookup_field = "uuid"


class GetChatPage(generics.RetrieveAPIView):
    queryset = ChatPage.objects.all().prefetch_related("bot", "experimental_condition")
    serializer_class = ChatPageSerializer
    lookup_field = "slug"


class NewConversation(APIView):
    def get(self, request, *args, **kwargs):
        chat_page = get_object_or_404(ChatPage, slug=kwargs["slug"])
        conversation = Conversation()
        conversation.chat_page = chat_page
        if uid := request.GET.get("uid"):
            conversation.external_id = uid
        conversation.save()
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)


class ListConversations(generics.RetrieveAPIView):
    queryset = ChatPage.objects.all().prefetch_related("conversations")
    serializer_class = ChatPageConversationSerializer  # TODO FIx this so it refers to a serializer that includes conversations
    lookup_field = "slug"


class MessageListAPIView(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        uuid = self.kwargs["uuid"]
        conversation = get_object_or_404(Conversation, uuid=uuid)
        queryset = Message.objects.filter(conversation=conversation).exclude(
            actor="system"  # Don't show the prompts
        )
        if len(queryset) > 0:
            return queryset
        else:
            return queryset.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class BotListAPIView(generics.ListAPIView):
    serializer_class = BotSerializer

    def get_queryset(self):
        #need to filter on connection and id and owner id once I figure out the JWT
        queryset = Bot.objects.all()
        if len(queryset) > 0:
            return queryset
        else:
            return queryset.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class ConversationAPIView(generics.ListAPIView):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        name = self.kwargs["slug"]
        bot = get_object_or_404(Bot, name=name)
        queryset = Conversation.objects.filter(chat_page__bot=bot)
        if len(queryset) > 0:
            return queryset
        else:
            return queryset.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
 # Export Conversations to CSV
def export_conversations_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="conversations.csv"'
    writer = csv.writer(response)
    writer.writerow(["Date", "Time", "IP", "User", "Conversation Detail", "Chatbot Model", "Chatbot Link"])
    
    for convo in Conversation.objects.all():
        messages = " | ".join([msg.text for msg in convo.messages.all()])
        writer.writerow([
            convo.created.date(), convo.created.time(), convo.user.ip_address if convo.user else "N/A",
            convo.user if convo.user else "Anonymous", messages, convo.chat_page.bot.model, convo.chat_page.slug
        ])
    
    return response

# Export Conversations to XML
def export_conversations_xml(request):
    root = ET.Element("Conversations")
    
    for convo in Conversation.objects.all():
        convo_elem = ET.SubElement(root, "Conversation")
        ET.SubElement(convo_elem, "Date").text = str(convo.created.date())
        ET.SubElement(convo_elem, "Time").text = str(convo.created.time())
        ET.SubElement(convo_elem, "IP").text = convo.user.ip_address if convo.user else "N/A"
        ET.SubElement(convo_elem, "User").text = str(convo.user) if convo.user else "Anonymous"
        ET.SubElement(convo_elem, "ChatbotModel").text = convo.chat_page.bot.model
        ET.SubElement(convo_elem, "ChatbotLink").text = convo.chat_page.slug
        messages_elem = ET.SubElement(convo_elem, "Messages")
        for msg in convo.messages.all():
            msg_elem = ET.SubElement(messages_elem, "Message", actor=msg.actor)
            msg_elem.text = msg.text
    
    xml_data = ET.tostring(root, encoding='utf-8')
    response = HttpResponse(xml_data, content_type='application/xml')
    response['Content-Disposition'] = 'attachment; filename="conversations.xml"'
    return response


 