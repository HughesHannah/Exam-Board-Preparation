from django.contrib import admin
from exam_board_preparation_app.models import Student, Course, Cohort, Exam, Coursework, Departments


# Register your models here.
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Cohort)
admin.site.register(Exam)
admin.site.register(Coursework)
admin.site.register(Departments)