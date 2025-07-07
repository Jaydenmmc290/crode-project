from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from accounts.views import create_opportunity, opportunity_list, profile_view

# Home view for Render root path
def home(request):
    return JsonResponse({"message": "Welcome to the Crode API!"})

urlpatterns = [
    path('', home),  

    # Admin panel
    path('admin/', admin.site.urls),

    # Djoser and dj-rest-auth routes
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),

    # API routes for your app
    path('api/opportunities/', create_opportunity),
    path('api/opportunities/list/', opportunity_list),
    path('api/profile/', profile_view),
]

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
