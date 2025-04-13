from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Custom user model for Research Chat Labs.
    Replaces first/last name with a single 'name' field.
    Includes extra metadata for research use.
    """

    # Removed default fields
    first_name = None
    last_name = None

    # Custom fields
    name = models.CharField("Name of User", max_length=255, blank=True)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)
    institution = models.CharField(max_length=255, blank=True, null=True)
    is_researcher = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
