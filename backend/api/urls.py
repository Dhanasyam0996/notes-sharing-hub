from django.urls import path
from .views import SubjectListCreateView, NoteListCreateView, NoteUpvoteView

urlpatterns = [
    path('subjects/', SubjectListCreateView.as_view(), name='subjects-list-create'),
    path('notes/', NoteListCreateView.as_view(), name='notes-list-create'),
    path('notes/<int:pk>/upvote/', NoteUpvoteView.as_view(), name='note-upvote'),
]