from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
import logging
from django.utils import timezone
from django.db.models import Q

logger = logging.getLogger(__name__)

from .models import Skill, Project, About, Contact, BlogPost, Testimonial
from .serializers import SkillSerializer, ProjectSerializer, AboutSerializer, ContactSerializer, BlogPostSerializer, TestimonialSerializer

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Skills retrieved successfully'
        })

    @action(detail=False)
    def categories(self, request):
        categories = Skill.objects.values_list('category', flat=True).distinct()
        return Response({
            'data': list(categories),
            'message': 'Skill categories retrieved successfully'
        })

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-featured', 'order', '-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Projects retrieved successfully'
        })

    @action(detail=False)
    def featured(self, request):
        featured_projects = Project.objects.filter(featured=True)
        serializer = self.get_serializer(featured_projects, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Featured projects retrieved successfully'
        })

class AboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        # Return the first About instance
        instance = get_object_or_404(About)
        serializer = self.get_serializer(instance)
        return Response({
            'data': serializer.data,
            'message': 'About retrieved successfully'
        })

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Blog posts retrieved successfully'
        })

    @action(detail=False)
    def scheduled(self, request):
        now = timezone.now()
        scheduled_posts = BlogPost.objects.filter(
            Q(scheduled_for__isnull=False) & Q(scheduled_for__gt=now)
        ).order_by('scheduled_for')
        serializer = self.get_serializer(scheduled_posts, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Scheduled posts retrieved successfully'
        })

    def perform_create(self, serializer):
        """Handle scheduling when creating a post."""
        scheduled_for = self.request.data.get('scheduled_for')
        if scheduled_for:
            serializer.save(
                published=False,
                scheduled_for=scheduled_for
            )
        else:
            serializer.save()

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('order', '-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'data': serializer.data,
            'message': 'Testimonials retrieved successfully'
        })

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        logger.info(f"Received contact form submission: {request.data}")
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            logger.info(f"Created contact record: {contact.id}")
            
            # Send email notification
            subject = f"New Contact Form Submission: {contact.subject}"
            message = f"""
            New message from your portfolio website:
            
            Name: {contact.name}
            Email: {contact.email}
            Subject: {contact.subject}
            
            Message:
            {contact.message}
            
            Sent on: {contact.created_at}
            """
            
            try:
                # Log email settings for debugging
                logger.info(f"Email settings: HOST={settings.EMAIL_HOST}, PORT={settings.EMAIL_PORT}, TLS={settings.EMAIL_USE_TLS}")
                logger.info(f"Sending from: {settings.DEFAULT_FROM_EMAIL}")
                logger.info(f"Sending to: {settings.DEFAULT_FROM_EMAIL}")
                
                # Send to your email
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL],
                    fail_silently=False,
                )
                logger.info("Main notification email sent successfully")
                
                # Send auto-reply
                try:
                    auto_reply_subject = "Thank you for contacting me"
                    auto_reply_message = f"""
                    Dear {contact.name},
                    
                    Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.
                    
                    Best regards,
                    Ola Yinka
                    """
                    
                    send_mail(
                        auto_reply_subject,
                        auto_reply_message,
                        settings.DEFAULT_FROM_EMAIL,
                        [contact.email],
                        fail_silently=True,
                    )
                    logger.info("Auto-reply email sent successfully")
                except Exception as auto_reply_error:
                    logger.error(f"Failed to send auto-reply: {str(auto_reply_error)}")
                
                return Response({
                    'message': 'Thank you for your message! I will get back to you soon.',
                    'status': 'success'
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Failed to send email notification: {str(e)}")
                logger.error(f"Error details: {type(e).__name__}: {str(e)}")
                # Still save the message but notify about email failure
                return Response({
                    'message': 'Your message has been received, but there was an issue with email notification.',
                    'status': 'partial_success'
                }, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Invalid form data: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
