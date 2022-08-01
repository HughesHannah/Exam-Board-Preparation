from rest_framework import serializers
from .models import GradedWork, Student, ClassHead, Course, Year

     
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('__all__')     
              
class ClassHeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassHead
        fields = '__all__'
        
class YearSerializer(serializers.ModelSerializer):
    year = serializers.CharField()
    class Meta:
        model = Year
        fields = '__all__'
        
class CourseSerializer(serializers.ModelSerializer):
    year = YearSerializer(read_only=True)
    class Meta:
        model = Course
        fields = ('__all__')
        
class GradedWorkSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    course = CourseSerializer()
    class Meta:
        model = GradedWork
        fields = ('__all__')         
        