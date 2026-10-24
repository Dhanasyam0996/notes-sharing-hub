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
        ('QB', 'Question Banks'),
        ('SYLLABUS', 'Syllabus Copies'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES, default='NOTES')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    semester = models.IntegerField(default=7)  # <--- ADD THIS FIELD
    file_url = models.URLField()
    uploader_name = models.CharField(max_length=100, blank=True, default='Anonymous')
    upvotes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} (Sem {self.semester})"