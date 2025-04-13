import requests

from .models import Bot, Conversation


def send_message(bot: Bot, conversation: Conversation, message: str) -> str:
    if bot.type == Bot.BotTypes.RASA:
        # return send_rasa_message(bot, conversation, message)
        return "Hello there"
    elif bot.type == Bot.BotTypes.BOT_FRAMEWORK:
        pass
    else:
        return "Can't send to that bot yet"


def send_rasa_message(bot: Bot, conversation: Conversation, message: str) -> str:
    r = requests.post(
        bot.url, json={"sender": str(conversation.uuid), "message": message}
    )
    message_reply = r.json()[0]["text"]
    return message_reply
