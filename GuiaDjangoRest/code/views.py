# api/views.py
# Django imports
from django.db.models import Avg
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404

# Django REST Framework imports
from rest_framework import viewsets, permissions, filters, generics, status, serializers
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

# Local imports
from .models import Autor, Categoria, Editorial, Libro, Resena
from .serializers import (
    AutorSerializer, CategoriaSerializer, EditorialSerializer,
    LibroListSerializer, LibroDetailSerializer, ResenaSerializer,
    UserRegistrationSerializer
)
from .permissions import IsAuthorOrReadOnly, IsAdminOrReadOnly

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

@method_decorator(csrf_exempt, name='dispatch')
class CustomModelViewSet(viewsets.ModelViewSet):
    """
    ViewSet personalizado para garantizar que el método DELETE funcione correctamente.
    CSRF exempt para asegurar que DELETE funcione incluso desde el navegador.
    """
    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribimos el método destroy para asegurar que DELETE funcione correctamente.
        """
        print(f"DEBUG - Iniciando eliminación con DELETE en {self.__class__.__name__}")
        print(f"DEBUG - Request: {request}")
        print(f"DEBUG - Request method: {request.method}")
        print(f"DEBUG - Request path: {request.path}")
        print(f"DEBUG - Request user: {request.user} (isAuthenticated: {request.user.is_authenticated}, isAdmin: {request.user.is_staff})")
        print(f"DEBUG - Request headers: {request.headers}")
        print(f"DEBUG - kwargs: {kwargs}")
        
        try:
            # Obtener el objeto a eliminar
            instance = self.get_object()
            instance_id = instance.id
            model_name = instance.__class__.__name__
            print(f"DEBUG - Objeto obtenido: {model_name} con ID {instance_id}")
            
            # Verificar permisos explícitamente (pero permitir siempre a superusuarios)
            if not request.user.is_superuser and not request.user.has_perm(f'api.delete_{model_name.lower()}'):
                print(f"DEBUG - Usuario no tiene permiso para eliminar {model_name}")
                return Response({
                    "detail": f"No tiene permiso para eliminar {model_name}",
                    "status": "error"
                }, status=status.HTTP_403_FORBIDDEN)
            
            # Realizar eliminación
            print(f"DEBUG - Llamando a perform_destroy para {model_name} con ID {instance_id}")
            self.perform_destroy(instance)
            print(f"DEBUG - Objeto {model_name} con ID {instance_id} eliminado correctamente")
            
            # Respuesta 200 OK en lugar de 204 No Content para que el cliente tenga confirmación
            return Response({
                "detail": f"{model_name} con ID {instance_id} ha sido eliminado correctamente.",
                "status": "success"
            }, status=status.HTTP_200_OK)
        except Exception as e:
            import traceback
            print(f"ERROR - Fallo al eliminar: {str(e)}")
            print(f"ERROR - Traceback: {traceback.format_exc()}")
            return Response({
                "detail": f"Error al eliminar: {str(e)}",
                "status": "error"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AutorViewSet(CustomModelViewSet):
    """
    API endpoint para autores.
    """
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'apellidos']
    ordering_fields = ['apellidos', 'nombre', 'fecha_nacimiento']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
    lookup_field = 'pk'  # Explícitamente usar la clave primaria para lookups
    
    # Método explícito para manejar DELETE
    def delete(self, request, *args, **kwargs):
        print(f"DEBUG - Método DELETE llamado directamente en AutorViewSet")
        print(f"DEBUG - URL: {request.path}")
        print(f"DEBUG - args: {args}")
        print(f"DEBUG - kwargs: {kwargs}")
        return self.destroy(request, *args, **kwargs)
        
    def get_object(self):
        """Sobreescribir para añadir más logging y diagnóstico"""
        print(f"DEBUG - AutorViewSet.get_object() llamado")
        try:
            obj = super().get_object()
            print(f"DEBUG - Objeto encontrado: {obj}")
            return obj
        except Exception as e:
            print(f"ERROR - No se pudo obtener el objeto: {e}")
            raise


class CategoriaViewSet(CustomModelViewSet):
    """
    API endpoint para categorías.
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']


class EditorialViewSet(CustomModelViewSet):
    """
    API endpoint para editoriales.
    """
    queryset = Editorial.objects.all()
    serializer_class = EditorialSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']


class LibroViewSet(CustomModelViewSet):
    """
    API endpoint para libros.
    """
    queryset = Libro.objects.all().annotate(
        promedio_valoraciones=Avg('resenas__valoracion')
    )
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categorias', 'editorial', 'autores', 'idioma']
    search_fields = ['titulo', 'isbn', 'sinopsis']
    ordering_fields = ['titulo', 'fecha_publicacion', 'promedio_valoraciones']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return LibroListSerializer
        return LibroDetailSerializer
    
    @action(detail=True, methods=['get'])
    def resenas(self, request, pk=None):
        """Endpoint personalizado para obtener las reseñas de un libro específico"""
        libro = self.get_object()
        resenas = libro.resenas.all()
        serializer = ResenaSerializer(resenas, many=True)
        return Response(serializer.data)


class ResenaViewSet(CustomModelViewSet):
    """
    API endpoint para reseñas.
    """
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['libro', 'usuario', 'valoracion']
    ordering_fields = ['created', 'valoracion']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
    
    def perform_create(self, serializer):
        """Asigna automáticamente el usuario actual como autor de la reseña"""
        serializer.save(usuario=self.request.user)


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Crear token para el usuario
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
            "message": "Usuario creado con éxito."
        }, status=status.HTTP_201_CREATED)


class UserStatusView(APIView):
    """
    Vista para verificar el estado y permisos del usuario actual
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format=None):
        user = request.user
        return Response({
            'username': user.username,
            'is_authenticated': user.is_authenticated,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'permissions': {
                'can_add_autor': user.has_perm('api.add_autor'),
                'can_change_autor': user.has_perm('api.change_autor'),
                'can_delete_autor': user.has_perm('api.delete_autor'),
                'can_view_autor': user.has_perm('api.view_autor')
            },
            'groups': list(user.groups.values_list('name', flat=True)),
        })

@api_view(['POST', 'DELETE'])
@permission_classes([permissions.IsAuthenticated, IsAdminOrReadOnly])
def eliminar_autor(request, autor_id):
    """
    Endpoint especial para eliminar un autor usando POST en lugar de DELETE.
    Esto es solo para depuración.
    """
    try:
        autor = get_object_or_404(Autor, pk=autor_id)
        nombre = f"{autor.nombre} {autor.apellidos}"
        autor_id = autor.id
        autor.delete()
        return Response({
            "mensaje": f"El autor '{nombre}' (ID:{autor_id}) ha sido eliminado correctamente.",
            "status": "success"
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "mensaje": f"Error al eliminar: {str(e)}",
            "status": "error"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def test_delete_endpoint(request):
    """
    Endpoint de prueba simple para verificar que DELETE funciona correctamente.
    """
    if request.method == 'DELETE':
        print("DEBUG - Recibida solicitud DELETE en endpoint de prueba")
        print(f"DEBUG - Headers: {request.headers}")
        return Response({
            "mensaje": "Método DELETE recibido correctamente",
            "metodo": request.method,
            "usuario": request.user.username,
            "timestamp": str(__import__('datetime').datetime.now())
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            "mensaje": "Este endpoint acepta solicitudes GET y DELETE",
            "metodo_actual": request.method
        }, status=status.HTTP_200_OK)
