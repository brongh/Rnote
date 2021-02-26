from django.shortcuts import render
from . import views
from .models import Notes
from .serializers import NotesSerializer, UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
