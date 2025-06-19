# api/serializers.py
# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Autor, Categoria, Editorial, Libro, Resena


class UserSerializer(serializers.ModelSerializer):
    """Serializador para el modelo User"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class AutorSerializer(serializers.ModelSerializer):
    """Serializador para el modelo Autor"""
    
    class Meta:
        model = Autor
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializador para el modelo Categoria"""
    
    class Meta:
        model = Categoria
        fields = '__all__'


class EditorialSerializer(serializers.ModelSerializer):
    """Serializador para el modelo Editorial"""
    
    class Meta:
        model = Editorial
        fields = '__all__'


class ResenaSerializer(serializers.ModelSerializer):
    """Serializador para el modelo Resena"""
    usuario = UserSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='usuario',
        write_only=True
    )
    
    class Meta:
        model = Resena
        fields = ['id', 'libro', 'usuario', 'usuario_id', 'titulo', 'texto', 'valoracion', 'created']


class LibroListSerializer(serializers.ModelSerializer):
    """Serializador para listar libros (versión resumida)"""
    autores = serializers.StringRelatedField(many=True)
    categorias = serializers.StringRelatedField(many=True)
    editorial = serializers.StringRelatedField()
    promedio_valoraciones = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Libro
        fields = ['id', 'titulo', 'autores', 'editorial', 'categorias', 'promedio_valoraciones']


class LibroDetailSerializer(serializers.ModelSerializer):
    """Serializador para detalles de un libro (versión completa)"""
    autores = AutorSerializer(many=True, read_only=True)
    categorias = CategoriaSerializer(many=True, read_only=True)
    editorial = EditorialSerializer(read_only=True)
    resenas = ResenaSerializer(many=True, read_only=True)
    promedio_valoraciones = serializers.FloatField(read_only=True)
    
    # Campos para asociar relaciones al crear/actualizar
    autor_ids = serializers.PrimaryKeyRelatedField(
        queryset=Autor.objects.all(),
        source='autores',
        write_only=True,
        many=True
    )
    categoria_ids = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='categorias',
        write_only=True,
        many=True
    )
    editorial_id = serializers.PrimaryKeyRelatedField(
        queryset=Editorial.objects.all(),
        source='editorial',
        write_only=True
    )
    
    class Meta:
        model = Libro
        fields = [
            'id', 'titulo', 'isbn', 'sinopsis', 'fecha_publicacion',
            'portada', 'paginas', 'idioma', 'autores', 'categorias',
            'editorial', 'autor_ids', 'categoria_ids', 'editorial_id',
            'resenas', 'promedio_valoraciones', 'created', 'modified'
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializador para registro de usuarios"""
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
        
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."})
        return data
    
    def create(self, validated_data):
        # Eliminar password_confirm ya que no es parte del modelo User
        validated_data.pop('password_confirm')
        
        # Crear usuario
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        return user
