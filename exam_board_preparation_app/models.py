import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Year(models.Model):
    yearStart = models.IntegerField(validators=[MaxValueValidator(3000), MinValueValidator(2000)])
    yearEnd = models.IntegerField()
    
    @property
    def year(self):
        return ("%s-%s" % ( self.yearStart, self.yearEnd ))
    
    def __str__(self): return self.year
    
class Student(models.Model):
    metriculationNumber = models.CharField(max_length=9, unique=True)
    name = models.CharField(max_length=225)
    degreeTitle = models.CharField(max_length=100) 
    mastersStudent = models.BooleanField()
    fastRouteStudent = models.BooleanField()
    exitYear = models.ForeignKey(Year, null=True, on_delete=models.SET_NULL)
    
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
    
class GradedWork(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    weighting = models.IntegerField()
    gradeMark = models.IntegerField()
    
    type_choices = [
        ('A', 'Assignment'),
        ('E', 'Exam'),
    ]
    type = models.CharField(
        choices=type_choices,
        max_length=25,
        default='A',
    )
    
class ClassHead(models.Model):
    user = models.ManyToManyField(User)
    level = models.IntegerField(unique=True)   
    
    def __str__(self): return ("Level " + str(self.level))
    
    

    
