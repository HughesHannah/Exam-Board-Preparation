from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('student', index),
    path('course', index),
    path('studentList', index),
    path('login', index),
]