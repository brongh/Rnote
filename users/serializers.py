from django.contrib.auth.models import User
from .models import Notes
from rest_framework import serializers

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('user_id', 'title','content')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', 'email', 'first_name', 'last_name', 'password')