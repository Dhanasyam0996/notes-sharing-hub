from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Subject, Note
from .serializers import SubjectSerializer, NoteSerializer

class SubjectListCreateView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_module = SubjectSerializer
    serializer_class = SubjectSerializer

    def get_queryset(self):
        queryset = Subject.objects.all()
        dept = self.request.query_params.get('department')
        sem = self.request.query_params.get('semester')
        if dept:
            queryset = queryset.filter(department__iexact=dept)
        if sem:
            queryset = queryset.filter(semester=sem)
        return queryset

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search')
        dept = self.request.query_params.get('department')
        sem = self.request.query_params.get('semester')
        rtype = self.request.query_params.get('resource_type')

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(subject__name__icontains=search) |
                Q(subject__code__icontains=search)
            )
        if dept:
            queryset = queryset.filter(subject__department__iexact=dept)
        if sem:
            queryset = queryset.filter(subject__semester=sem)
        if rtype:
            queryset = queryset.filter(resource_type=rtype)

        return queryset

class NoteUpvoteView(APIView):
    def post(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
            note.upvotes += 1
            note.save()
            return Response({'status': 'upvoted', 'upvotes': note.upvotes}, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)