from django.contrib.auth.models import User
from .models import Notes
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('user_id', 'title','content', 'id')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', 'email', 'first_name', 'last_name', 'password')
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        username = super().create(validated_data)
        username.set_password(password)
        username.save()
        return username
    
class NotesUserSerializer(serializers.ModelSerializer):
    notes_set = NotesSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('id', 'notes_set')
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        
        token['mk'] = user.last_name
        return token
        
        