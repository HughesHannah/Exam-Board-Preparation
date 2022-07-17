from rest_framework import serializers
from .models import Student, Departments, ClassHead

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('matriculationNumber')
        
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('id', 'DepartmentName')
        
class ClassHeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassHead
        fields = '__all__'
        