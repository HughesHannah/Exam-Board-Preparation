import datetime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

######## Test Model #########
class Departments(models.Model):
    id= models.AutoField(primary_key=True, unique=True)
    DepartmentName= models.CharField(max_length=255)
#############################


class Student(models.Model):
    metriculationNumber = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=225)
    degreeTitle = models.CharField(max_length=100) 
    mastersStudent = models.BooleanField()
    fastRouteStudent = models.BooleanField()
    
    yearOfStudy_CHOICES = [
        (1, 'Level 1'),
        (2, 'Level 2'),
        (3, 'Level 3'),
        (4, 'Level 4'),
        (5, 'Level 5'),
        (6, 'Graduate'),
        (0, 'Other'),
    ]
    yearOfStudy = models.IntegerField(
        choices=yearOfStudy_CHOICES,
        default=0,
    )
    
    def __str__(self): return self.metriculationNumber

class Course(models.Model):
    classCode = models.CharField(max_length=255)
    className = models.CharField(max_length=255, null=True)  
    credits = models.IntegerField()  
    students = models.ManyToManyField(Student, blank = True)
    year = models.CharField(max_length=9, default=(str(datetime.date.today().year) + "/" + str(datetime.date.today().year+1)))
    
    def __str__(self): return (self.classCode + " - " + str(self.year))
    
class Assignment(models.Model):
    name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    weighting = models.IntegerField()
    gradeMark = models.IntegerField()
    
    
class Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    weighting = models.IntegerField()
    q1Mark = models.IntegerField()
    q2Mark = models.IntegerField()
    q3Mark = models.IntegerField()
    
class ClassHead(models.Model):
    user = models.ManyToManyField(User)
    level = models.IntegerField()   
    
    def __str__(self): return ("Level " + str(self.level))
    
    

    
