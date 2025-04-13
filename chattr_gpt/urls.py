from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("adminpanel/", admin.site.urls),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/users/", include("users.urls")),
    path("api/", include("chat.urls")),
    path("accounts/", include("allauth.urls")),
]

# This catches ALL other routes like /login, /register, etc.
urlpatterns += [
    re_path(r"^(?!api/).*", TemplateView.as_view(template_name="frontend/index.html"), name="spa-catchall"),
]