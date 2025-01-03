# Generated by Django 5.1.3 on 2024-11-20 19:34

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('cv_file', models.FileField(blank=True, upload_to='cv/')),
                ('profile_image', models.ImageField(upload_to='profile/')),
                ('email', models.EmailField(max_length=254)),
                ('github', models.URLField(validators=[django.core.validators.URLValidator()])),
                ('linkedin', models.URLField(validators=[django.core.validators.URLValidator()])),
                ('twitter', models.URLField(blank=True, validators=[django.core.validators.URLValidator()])),
                ('location', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'About',
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=200)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('icon', models.CharField(help_text='Icon name from React Icons', max_length=100)),
                ('category', models.CharField(choices=[('frontend', 'Frontend'), ('backend', 'Backend'), ('database', 'Database'), ('devops', 'DevOps'), ('tools', 'Tools'), ('other', 'Other')], max_length=20)),
                ('proficiency', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)])),
                ('description', models.TextField()),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='projects/')),
                ('github_url', models.URLField(blank=True, validators=[django.core.validators.URLValidator()])),
                ('live_url', models.URLField(blank=True, validators=[django.core.validators.URLValidator()])),
                ('order', models.IntegerField(default=0)),
                ('featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('technologies', models.ManyToManyField(to='portfolio.skill')),
            ],
            options={
                'ordering': ['-featured', 'order', '-created_at'],
            },
        ),
    ]
