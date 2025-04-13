from django.urls import include, path
from rest_framework import routers

from . import views

app_name = "chat"

router = routers.DefaultRouter()
router.register(r"conversations", views.ConversationViewSet)
router.register(r"chat-pages", views.ChatPageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("csrf/", views.csrf, name="csrf"),
    path("bots/", views.BotListAPIView.as_view(), name="bots"),
    path("bots/<slug:slug>", views.ConversationAPIView.as_view(), name="conversation_detail"),
    path("send_message/", views.send_chat_message, name="send_message"),
    path(
        "<slug:slug>/conversations/",
        views.ListConversations.as_view(),
        name="get_conversations",
    ),
    path("<slug:slug>/", views.GetChatPage.as_view(), name="landing"),
    path("<slug:slug>/new/", views.NewConversation.as_view(), name="new_conversation"),
    path(
        "<slug:slug>/<uuid:uuid>/", views.GetConversation.as_view(), name="conversation"
    ),
    path(
        "conversations/<uuid:uuid>/messages/",
        views.MessageListAPIView.as_view(),
        name="messages",
    )
]
