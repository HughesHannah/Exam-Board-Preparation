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
    matriculationNumber = models.CharField(max_length=9, unique=True)
    name = models.CharField(max_length=225)
    degreeTitle = models.CharField(max_length=100) 
    mastersStudent = models.BooleanField()
    fastRouteStudent = models.BooleanField()
    exitYear = models.ForeignKey(Year, null=True, on_delete=models.SET_NULL)
    
    def __str__(self): return self.matriculationNumber

class Course(models.Model):
    classCode = models.CharField(max_length=11)
    className = models.CharField(max_length=255, null=True)  
    credits = models.PositiveIntegerField()  
    students = models.ManyToManyField(Student, blank = True, related_name="course_students")
    year = models.ForeignKey(Year, null=True, on_delete=models.SET_NULL)
    isTaught = models.BooleanField(default=True)
    lecturerComments = models.TextField(max_length=500, null=True)
    
    def __str__(self): return (self.classCode + " - " + str(self.year))
    
class GradedWork(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="work_course")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="work_student")
    weighting = models.IntegerField()
    gradeMark = models.IntegerField()
    moderation = models.DecimalField(default=1.0, decimal_places=2, max_digits=5)
    
    preponderance_choices = [
        ('NA', 'None'),
        ('MV', 'Medical Void'),
        ('CW', 'Credit Witheld'),
        ('CR', 'Credit Refused'),
    ]
    preponderance = models.CharField(
        choices=preponderance_choices,
        default='NA',
        max_length=5,
    )
    
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
      
    level_choices = [
        (1, 'Level 1'),
        (2, 'Level 2'),
        (3, 'Level 3'),
        (4, 'Level 4'),
        (5, 'Level 5'),
        (0, 'All Levels')
    ]
    level = models.IntegerField(
        choices=level_choices,
        default='0',
    )
    
    def __str__(self): return ("Level " + str(self.level))
    

class StudentComment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(auto_now_add=True)
    subjectLine = models.CharField(max_length=255)
    comment = models.TextField(blank=True, null=True)
    