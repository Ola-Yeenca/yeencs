from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, URLValidator
from django.utils.text import slugify
from django.utils import timezone
from tinymce.models import HTMLField
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill, ResizeToFit

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('tools', 'Tools'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, help_text="Icon name from React Icons")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)]
    )
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    technologies = models.ManyToManyField(Skill)
    github_url = models.URLField(validators=[URLValidator()], blank=True)
    live_url = models.URLField(validators=[URLValidator()], blank=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', 'order', '-created_at']

    def __str__(self):
        return self.title

class About(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    cv_file = models.FileField(upload_to='cv/', blank=True)
    profile_image = models.ImageField(upload_to='profile/')
    email = models.EmailField()
    github = models.URLField(validators=[URLValidator()])
    linkedin = models.URLField(validators=[URLValidator()])
    twitter = models.URLField(validators=[URLValidator()], blank=True)
    location = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "About"

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.subject} from {self.name}"

class SEOMetadata(models.Model):
    seo_title = models.CharField(max_length=60, help_text="Max 60 characters for optimal SEO", blank=True)
    seo_description = models.CharField(max_length=160, help_text="Max 160 characters for optimal SEO", blank=True)
    keywords = models.CharField(max_length=200, help_text="Comma-separated keywords", blank=True)
    og_image = models.ImageField(upload_to='seo/', blank=True, help_text="Image for social sharing")
    canonical_url = models.URLField(blank=True)

    class Meta:
        abstract = True

class BlogPost(SEOMetadata):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField()
    content = HTMLField()
    featured_image = models.ImageField(upload_to='blog/', blank=True)
    
    # Optimized versions of the featured image
    featured_image_thumbnail = ImageSpecField(
        source='featured_image',
        processors=[ResizeToFit(300, 200)],
        format='JPEG',
        options={'quality': 80}
    )
    featured_image_large = ImageSpecField(
        source='featured_image',
        processors=[ResizeToFit(1200, 800)],
        format='JPEG',
        options={'quality': 85}
    )
    featured_image_og = ImageSpecField(
        source='featured_image',
        processors=[ResizeToFill(1200, 630)],  # Open Graph recommended size
        format='JPEG',
        options={'quality': 85}
    )
    
    date = models.DateField()
    read_time = models.CharField(max_length=20)
    tags = models.JSONField(default=list)
    published = models.BooleanField(default=False)
    scheduled_for = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            
        # Handle scheduled publishing
        if self.scheduled_for and self.scheduled_for <= timezone.now():
            self.published = True
            self.date = self.scheduled_for.date()
            self.scheduled_for = None
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    image = models.ImageField(upload_to='testimonials/')
    text = models.TextField()
    active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.company}"
