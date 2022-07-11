from django.db import models

# Create your models here.
class Departments(models.Model):
    DepartmentID= models.AutoField(primary_key=True, unique=True)
    DepartmentName= models.CharField(max_length=255)

class Cohort(models.Model):
    yearOfStudy = models.IntegerField(null=True)
    degree = models.CharField(max_length=255) 
    
    def __str__(self): return self.degree

class Student(models.Model):
    metriculationNumber = models.CharField(max_length=10,null=True)
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, null=True)
    
    def __str__(self): return self.metriculationNumber


class Course(models.Model):
    classCode = models.CharField(max_length=255)
    className = models.CharField(max_length=255, null=True)    
    
    students = models.ManyToManyField(Student)
    
    def __str__(self): return self.classCode
    
class Coursework(models.Model):
    gradeMark = models.IntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    studnet = models.ForeignKey(Student, on_delete=models.CASCADE)
    
    
    
class Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    q1Mark = models.IntegerField()
    q2Mark = models.IntegerField()
    q3Mark = models.IntegerField()
    
   
    
    

    
