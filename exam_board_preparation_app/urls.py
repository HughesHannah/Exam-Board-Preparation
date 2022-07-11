from django.urls import path
from exam_board_preparation_app import views

urlpatterns = [
    path('department', views.DepartmentAPI),
]