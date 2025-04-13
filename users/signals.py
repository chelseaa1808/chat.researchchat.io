from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from users.models import Profile
import logging

User = get_user_model()
logger = logging.getLogger(__name__)

@receiver(post_save, sender=User)
def handle_user_created(sender, instance, created, **kwargs):
    if created:
        # Log creation
        logger.info(f"✅ New user created: {instance.username} (ID: {instance.id})")

        # Create associated profile
        Profile.objects.get_or_create(user=instance)

        # Send welcome email
        try:
            send_mail(
                subject="🎉 Welcome to ResearchChat!",
                message=(
                    f"Hi {instance.username},\n\n"
                    "Thanks for joining ResearchChat. Your research journey starts here. "
                    "Feel free to reach out if you have questions!"
                ),
                from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@researchchat.io"),
                recipient_list=[instance.email],
                fail_silently=False,  # Make this True in production if no email backend is configured
            )
        except Exception as e:
            logger.warning(f"📧 Failed to send welcome email to {instance.email}: {e}")
