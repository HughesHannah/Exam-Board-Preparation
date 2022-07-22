from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('course', index),
    path('students', index),
    path('students/<studentID>', index),
    path('login', index),
    path('profile', index),
    path('courses', index),
    path('courses/<courseID>', index),
    path('grading', index),
    path('export', index),
    path('upload', index),
]