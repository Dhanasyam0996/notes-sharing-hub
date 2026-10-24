from rest_framework import serializers
from .models import Note, Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    subject_details = SubjectSerializer(source='subject', read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), source='subject', write_only=True
    )

    class Meta:
        model = Note
        fields = [
            'id', 'title', 'description', 'resource_type', 
            'subject_id', 'subject_details', 'semester', 
            'file_url', 'uploader_name', 'upvotes', 'created_at'
        ]