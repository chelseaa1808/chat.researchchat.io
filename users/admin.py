from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'institution', 'joined_on']
    search_fields = ['user__username', 'institution']
    
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    ordering = ['id']

    list_display = ['username', 'email', 'name', 'is_staff', 'is_active']
    list_filter = ['is_staff', 'is_superuser', 'is_active']
    search_fields = ['username', 'email', 'name', 'bio', 'institution']
    date_hierarchy = "date_joined"  # Adds timeline navigation at the top

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal Info'), {'fields': ('name', 'email', 'bio', 'institution')}),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            )
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'password1',
                'password2',
                'email',
                'name',
                'is_staff',
                'is_active'
            ),
        }),
    )
