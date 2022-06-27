from django.shortcuts import render
from rest_framework import generics
from .serializers import StudentSerializer
from .models import Student

# Create your views here.

class StudentView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer