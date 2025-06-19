# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserRegistrationView, UserStatusView

# Crear router y registrar nuestros viewsets
router = DefaultRouter()

# Registro de los viewsets con el router
router.register(r'autores', views.AutorViewSet, basename='autor')
router.register(r'categorias', views.CategoriaViewSet, basename='categoria')
router.register(r'editoriales', views.EditorialViewSet, basename='editorial')
router.register(r'libros', views.LibroViewSet, basename='libro')
router.register(r'resenas', views.ResenaViewSet, basename='resena')

# Las URLs de API son determinadas automáticamente por el router
urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('user-status/', UserStatusView.as_view(), name='user-status'),
]