from django.contrib import admin
from exam_board_preparation_app.models import GradedWork, Student, Course, GradedWork, ClassHead, Year


# Register your models here.
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(GradedWork)
admin.site.register(ClassHead)
admin.site.register(Year)
