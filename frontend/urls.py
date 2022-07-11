from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('course', index),
    path('students', index),
    path('students/<studentID>', index),
    path('students/new', index),
    path('login', index),
    path('users', index),
    path('users/<userID>', index),
    path('users/new', index),
    path('departments', index),
]