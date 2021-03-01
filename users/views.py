from django.shortcuts import render
from . import views
from .models import Notes, User
from .serializers import NotesSerializer, UserSerializer, NotesUserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
# from django.contrib.auth.models import User


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NotesUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = NotesUserSerializer
    
class MyObtainTokenPairView(TokenObtainPairView):
    permissions_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer