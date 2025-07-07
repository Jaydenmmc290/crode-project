from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from dj_rest_auth.views import UserDetailsView
from accounts.views import create_opportunity, opportunity_list, profile_view
from django.http import JsonResponse



def home(request):
    return JsonResponse({"message": "Welcome to the Crode API!"})

urlpatterns = [
     path('', home),  
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include('accounts.urls')),

    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/user/', UserDetailsView.as_view()),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/opportunities/', create_opportunity),
    path('opportunities/', opportunity_list),
    path('api/profile/', profile_view), 
    path('auth/user/', profile_view),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

