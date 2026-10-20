from django.contrib import admin
from .models import Subject, Note

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'department', 'semester')
    list_filter = ('department', 'semester')

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'resource_type', 'upvotes', 'created_at')
    list_filter = ('resource_type', 'subject__department')