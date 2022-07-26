import datetime
from django.db import models
from django.contrib.auth.models import User

class Year(models.Model):
    #TODO enforce yyyy
    year = models.CharField(max_length=125, unique = True)
    
    def __str__(self): return self.year
    
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
    classCode = models.CharField(max_length=11)
    className = models.CharField(max_length=255, null=True)  
    credits = models.PositiveIntegerField()  
    students = models.ManyToManyField(Student, blank = True)
    year = models.ForeignKey(Year, null=True, on_delete=models.SET_NULL)
    isTaught = models.BooleanField(default=True)
    lecturerComments = models.TextField(max_length=500, null=True)
    
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
    level = models.IntegerField(unique=True)   
    
    def __str__(self): return ("Level " + str(self.level))
    
    

    
