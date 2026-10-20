from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=50) # e.g. CSE, ECE, IT, MECH
    semester = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.code} - {self.name}"

class Note(models.Model):
    RESOURCE_TYPES = [
        ('NOTES', 'Class Notes'),
        ('QB', 'Question Bank'),
        ('SYLLABUS', 'Syllabus Copy'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES, default='NOTES')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    file_url = models.URLField()
    uploader_name = models.CharField(max_length=100, default='Anonymous Student')
    upvotes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title