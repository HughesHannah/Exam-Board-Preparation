from django.contrib import admin
from exam_board_preparation_app.models import Student, Course, Exam, Assignment, ClassHead, Year


# Register your models here.
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Exam)
admin.site.register(Assignment)
admin.site.register(ClassHead)
admin.site.register(Year)
