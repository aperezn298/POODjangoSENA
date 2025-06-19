from django.contrib import admin
from .models import Autor, Categoria, Editorial, Libro, Resena

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'fecha_nacimiento')
    search_fields = ('nombre', 'apellidos')

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)

@admin.register(Editorial)
class EditorialAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'sitio_web')
    search_fields = ('nombre',)

@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'isbn', 'fecha_publicacion', 'editorial')
    list_filter = ('categorias', 'editorial', 'fecha_publicacion')
    search_fields = ('titulo', 'isbn')
    filter_horizontal = ('autores', 'categorias')
    date_hierarchy = 'fecha_publicacion'

@admin.register(Resena)
class ResenaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'libro', 'usuario', 'valoracion')
    list_filter = ('valoracion',)
    search_fields = ('titulo', 'libro__titulo')