from django.db import models

# Create your models here.
class Student(models.Model):
    metriculation_number = models.CharField(max_length=7, unique=True)
    student_name = models.CharField(max_length = 255)
    