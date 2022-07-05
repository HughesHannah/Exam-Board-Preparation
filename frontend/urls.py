from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('student', index),
    path('course', index),
    path('student/List', index),
    path('login', index),
    path('student/<studentID>', index),
]