from rest_framework import serializers

from .models import Bot, ChatPage, Conversation, ExperimentalCondition, Message


class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bot
        fields = ["display_name", "name", "model", "system_message", "bot_initiates"]


class ExperimentalConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperimentalCondition
        fields = ["typing_indicator", "typing_delay", "avatar"]


class ChatPageSerializer(serializers.ModelSerializer):
    bot = BotSerializer()
    experimental_condition = ExperimentalConditionSerializer()

    class Meta:
        model = ChatPage
        fields = ["slug", "experimental_condition", "bot", "disclaimer"]
        depth = 1


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "text", "actor", "created"]


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    chat_page = ChatPageSerializer(read_only=True)

    def to_representation(self, instance):
        return super().to_representation(instance)

    class Meta:
        model = Conversation
        fields = ["uuid", "external_id", "chat_page", "messages", "created"]
        depth = 2


class ChatPageConversationSerializer(serializers.ModelSerializer):
    conversations = ConversationSerializer(many=True)

    class Meta:
        model = ChatPage
        fields = ["slug", "conversations"]
        depth = 1
