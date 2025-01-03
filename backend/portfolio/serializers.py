from rest_framework import serializers
from .models import Skill, Project, About, Contact, BlogPost, Testimonial

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('name', 'email', 'subject', 'message')
        
    def create(self, validated_data):
        return Contact.objects.create(**validated_data)

class BlogPostSerializer(serializers.ModelSerializer):
    readTime = serializers.CharField(source='read_time')
    featured_image_url = serializers.SerializerMethodField()
    featured_image_thumbnail_url = serializers.SerializerMethodField()
    featured_image_large_url = serializers.SerializerMethodField()
    featured_image_og_url = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content',
            'date', 'readTime', 'tags', 'created_at',
            'featured_image_url', 'featured_image_thumbnail_url',
            'featured_image_large_url', 'featured_image_og_url',
            'meta'
        ]

    def get_featured_image_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image.url)
        return None

    def get_featured_image_thumbnail_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image_thumbnail.url)
        return None

    def get_featured_image_large_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image_large.url)
        return None

    def get_featured_image_og_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image_og.url)
        return None

    def get_meta(self, obj):
        return {
            'title': obj.title,
            'description': obj.excerpt,
            'keywords': obj.keywords,
            'canonical_url': obj.canonical_url,
            'og_image': self.get_featured_image_og_url(obj)
        }

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'role', 'company',
            'image', 'text', 'order'
        ]
