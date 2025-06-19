# mi_proyecto/urls.py
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from rest_framework.authtoken import views as auth_views  # Importar vistas para tokens

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # URLs versionadas para la API
    # Ejemplo: /api/v1/autores/
    path(f"{settings.API_BASE}/{settings.API_VERSION}/", include('api.urls')),
    
    # URLs sin versionar (compatibilidad)
     # Incluir las URLs de nuestra API
    path(f"{settings.API_BASE}/", include('api.urls')), 
    
    # Autenticación y tokens
    # URLs para autenticación por navegador
    path('api-auth/', include('rest_framework.urls')),  
    # URL para obtener el token
    path('api-token-auth/', auth_views.obtain_auth_token, name='api_token_auth'),  
]

# Configuración para servir archivos multimedia durante desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)