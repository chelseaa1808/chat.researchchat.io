from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from users.views import CookieTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("adminpanel/", admin.site.urls),

    path("api/auth/login/", CookieTokenObtainPairView.as_view(), name="custom_login"),
    
    # JWT auth
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # dj-rest-auth
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),

    path("api/users/", include("users.urls")),
    path("api/", include("chat.urls")),
    path("accounts/", include("allauth.urls")),
]

# Catch-all for React frontend
urlpatterns += [
    re_path(r"^(?!api/).*", TemplateView.as_view(template_name="frontend/index.html"), name="spa-catchall"),
]
