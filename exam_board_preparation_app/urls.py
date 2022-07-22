from django.urls import path
from exam_board_preparation_app import views

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('classheads', views.ClassHeadAPI),
    path('studentAPI', views.StudentAPI),
    path('individualStudentAPI/<id>', views.IndividualStudentAPI),
    path('courseAPI/<year>', views.CourseYearAPI),
    path('courseAPI/', views.CourseAPI),
    path('yearsAPI', views.YearsAPI),
    path('uploader', views.UploadAPI),
    path('courseUploader', views.UploadCoursesAPI),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]