from rest_framework import serializers
from .models import Student, Departments, ClassHead, Course

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('__all__')
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')
        
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('id', 'DepartmentName')
        
class ClassHeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassHead
        fields = '__all__'
        

        