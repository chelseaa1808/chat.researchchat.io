from django.contrib import admin
from django.utils.html import format_html
from .models import Conversation

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
    search_fields = ("user__username", "chat_page__slug")
    list_filter = ("chat_page__bot__model",)
    ordering = ("-modified",)

    def export_links(self, obj):
        return format_html(
            '<a class="button" href="/api/export/conversations/csv/" target="_blank">Export CSV</a>&nbsp;'
            '<a class="button" href="/api/export/conversations/xml/" target="_blank">Export XML</a>'
        )
    def number_of_messages(self, obj):
        return obj.messages.count()

    export_links.short_description = "Export Data"
