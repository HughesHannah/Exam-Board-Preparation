from rest_framework import serializers
from .models import Student, ClassHead, Course

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('__all__')
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')
        
        
class ClassHeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassHead
        fields = '__all__'
        

        