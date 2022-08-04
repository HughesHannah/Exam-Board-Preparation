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

 
class SimpleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'classCode', 'credits')   
        
        
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
    # work_student = serializers.SerializerMethodField()
    work_student = SimpleGradedWorkSerializer(many=True)
    class Meta:
        model = Student
        fields = ('id', 'metriculationNumber', 'name', 'degreeTitle', 'work_student')     
        
    # def get_work_student(self, object):
    #     try:
    #         work = object.work_student.filter(course = 1)
    #         return GradedWorkSerializer(work).data
    #     except GradedWork.DoesNotExist:
    #         return None      
        
         
        
    