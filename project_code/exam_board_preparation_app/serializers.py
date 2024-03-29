from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class YearSerializer(serializers.ModelSerializer):
    year = serializers.CharField()
    class Meta:
        model = Year
        fields = '__all__'     
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')         
     
class StudentSerializer(serializers.ModelSerializer):
    exitYear = YearSerializer()
    class Meta:
        model = Student
        fields = ('__all__')     
              
class ClassHeadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = ClassHead
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

 
class SimpleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'classCode', 'className', 'credits')   
        
        
class SimpleGradedWorkSerializer(serializers.ModelSerializer):
    course = SimpleCourseSerializer(many = False)
    class Meta:
        model = GradedWork
        fields = ('__all__')          
        
class CoursesToGradesSerializer(serializers.ModelSerializer):
    work_course = SimpleGradedWorkSerializer(many=True)
    class Meta:
        model = Course
        fields = ('id', 'classCode', 'credits', 'work_course')    
               
        
class StudentsToCoursesSerializer(serializers.ModelSerializer):
    course_students = CoursesToGradesSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = ('__all__')  
        
class StudentsToGradesSerializer(serializers.ModelSerializer):
    
    work_student = SimpleGradedWorkSerializer(many=True)
    class Meta:
        model = Student
        fields = ('id', 'matriculationNumber', 'name', 'degreeTitle', 'work_student')     
        

class OverallGradeCourseSerializer(serializers.ModelSerializer):
    work_course = SimpleGradedWorkSerializer(many=True)

    class Meta:
        model = Course
        fields = ('__all__')           
        
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = StudentComment
        fields = ('__all__')
         
class DegreeClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeClassification
        fields = ('__all__')        
    