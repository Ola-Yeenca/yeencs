from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SkillViewSet, ProjectViewSet, AboutViewSet, 
    ContactViewSet, BlogPostViewSet, TestimonialViewSet
)

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'about', AboutViewSet, basename='about')
router.register(r'contact', ContactViewSet)
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
