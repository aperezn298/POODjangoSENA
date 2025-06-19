# api/permissions.py
from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Permiso personalizado para permitir que los autores de un objeto lo editen,
    mientras que los demás solo pueden verlo.
    """

    def has_object_permission(self, request, view, obj):
        # Los permisos de lectura están permitidos para cualquier solicitud,
        # por lo que siempre permitimos métodos GET, HEAD y OPTIONS.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Los permisos de escritura solo son para el autor.
        # Asumimos que el objeto tiene un campo 'usuario' que identifica al autor.
        # Si el objeto tiene otro nombre para el campo de autor, ajustar aquí.
        if hasattr(obj, 'usuario'):
            return obj.usuario == request.user
        
        return False

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permiso personalizado para permitir que solo administradores editen objetos,
    mientras que los demás solo pueden verlos.
    """

    def has_permission(self, request, view):
        # Los permisos de lectura están permitidos para cualquier solicitud
        if request.method in permissions.SAFE_METHODS:
            return True

        # Los permisos de escritura solo son para administradores
        return request.user and request.user.is_staff