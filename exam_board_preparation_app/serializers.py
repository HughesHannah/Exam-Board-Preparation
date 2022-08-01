from rest_framework import serializers
from .models import GradedWork, Student, ClassHead, Course, Year

     
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('__all__')
        
class GradedWorkSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    class Meta:
        model = GradedWork
        fields = ('__all__')      
        
class GradedWorkInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradedWork
        fields = (['name', 'weighting'])            
        
class StudentsAndGradesSerializer(serializers.ModelSerializer): 
    @classmethod
    def get_serializer(cls, model):
        if model == Student:
            return StudentSerializer
        elif model == GradedWork:
            return GradedWorkSerializer

    def to_representation(self, instance):
        serializer = self.get_serializer(instance.__class__)
        return serializer(instance, context=self.context).data        
              
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
        