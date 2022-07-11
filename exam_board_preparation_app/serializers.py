from rest_framework import serializers
from .models import Student, Departments

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('matriculationNumber')
        
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('id', 'DepartmentID', 'DepartmentName')