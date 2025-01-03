from django.contrib import admin
from django.utils.html import format_html
from .models import Skill, Project, About, Contact, BlogPost, Testimonial

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'order')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    ordering = ('order', 'name')
    list_editable = ('order', 'proficiency')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_image', 'featured', 'order', 'created_at')
    list_filter = ('featured', 'technologies')
    search_fields = ('title', 'description')
    ordering = ('-featured', 'order', '-created_at')
    list_editable = ('featured', 'order')
    filter_horizontal = ('technologies',)

    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No image"
    display_image.short_description = 'Image'

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'display_profile_image')
    search_fields = ('title', 'content', 'email')

    def display_profile_image(self, obj):
        if obj.profile_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 25px;" />', 
                             obj.profile_image.url)
        return "No image"
    display_profile_image.short_description = 'Profile Image'

    def has_add_permission(self, request):
        # Only allow one About instance
        if self.model.objects.exists():
            return False
        return True

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'created_at', 'read')
    list_filter = ('read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    ordering = ('-created_at',)
    list_editable = ('read',)

    def has_add_permission(self, request):
        return False  # Prevent adding contacts through admin

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'read_time', 'published', 'scheduled_status')
    list_filter = ('published', 'date')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'
    list_editable = ('published',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image', 'tags')
        }),
        ('SEO', {
            'fields': ('seo_title', 'seo_description', 'keywords', 'og_image', 'canonical_url'),
            'classes': ('collapse',)
        }),
        ('Publishing', {
            'fields': ('published', 'scheduled_for', 'date', 'read_time')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def scheduled_status(self, obj):
        if obj.scheduled_for and not obj.published:
            return format_html(
                '<span style="color: #1E88E5;">Scheduled for {}</span>',
                obj.scheduled_for.strftime('%Y-%m-%d %H:%M')
            )
        return format_html(
            '<span style="color: {};">{}</span>',
            '#4CAF50' if obj.published else '#F44336',
            'Published' if obj.published else 'Draft'
        )
    scheduled_status.short_description = 'Status'

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'role', 'active', 'order')
    list_filter = ('active',)
    list_editable = ('active', 'order')
    search_fields = ('name', 'company')
