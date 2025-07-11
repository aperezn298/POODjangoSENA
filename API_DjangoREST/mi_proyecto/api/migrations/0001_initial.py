# Generated by Django 3.2.25 on 2025-06-19 15:57

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Autor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('nombre', models.CharField(max_length=100)),
                ('apellidos', models.CharField(max_length=100)),
                ('fecha_nacimiento', models.DateField(blank=True, null=True)),
                ('biografia', models.TextField(blank=True)),
                ('foto', models.URLField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Autor',
                'verbose_name_plural': 'Autores',
                'ordering': ['apellidos', 'nombre'],
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('nombre', models.CharField(max_length=50, unique=True)),
                ('descripcion', models.TextField(blank=True)),
            ],
            options={
                'verbose_name': 'Categoría',
                'verbose_name_plural': 'Categorías',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Editorial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('direccion', models.TextField(blank=True)),
                ('sitio_web', models.URLField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
            ],
            options={
                'verbose_name': 'Editorial',
                'verbose_name_plural': 'Editoriales',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('titulo', models.CharField(max_length=200)),
                ('isbn', models.CharField(max_length=13, unique=True, verbose_name='ISBN')),
                ('sinopsis', models.TextField(blank=True)),
                ('fecha_publicacion', models.DateField()),
                ('portada', models.ImageField(blank=True, null=True, upload_to='portadas/')),
                ('paginas', models.PositiveIntegerField(default=1)),
                ('idioma', models.CharField(default='Español', max_length=30)),
                ('autores', models.ManyToManyField(related_name='libros', to='api.Autor')),
                ('categorias', models.ManyToManyField(related_name='libros', to='api.Categoria')),
                ('editorial', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='libros', to='api.editorial')),
            ],
            options={
                'verbose_name': 'Libro',
                'verbose_name_plural': 'Libros',
                'ordering': ['-fecha_publicacion'],
            },
        ),
        migrations.CreateModel(
            name='Resena',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('titulo', models.CharField(max_length=100)),
                ('texto', models.TextField()),
                ('valoracion', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('libro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resenas', to='api.libro')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resenas', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Reseña',
                'verbose_name_plural': 'Reseñas',
                'ordering': ['-created'],
                'unique_together': {('libro', 'usuario')},
            },
        ),
    ]
