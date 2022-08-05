from django.urls import path
from exam_board_preparation_app import views

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('classheads', views.ClassHeadAPI),
    path('studentAPI/', views.StudentAPI),
    path('courseAPI/', views.CourseAPI),
    path('courseAPI/simple', views.simpleCourseAPI),
        
    path('gradesAPI/Preponderance', views.allPreponderanceGradedWork),
    
    path('courseAPI/<year>/<code>/students', views.studentsAndGradesForCourseAPI),
    path('courseAPI/<year>/<code>/students/grades', views.GradesInCourseAPI),
    path('courseAPI/<year>/<code>', views.IndividualCourseYearAPI),

    path('courseAPI/<year>', views.CourseYearAPI),
    
    path('individualStudentAPI/<id>', views.IndividualStudentAPI),
    path('studentCoursesAPI/<id>', views.IndividualStudentCoursesAPI),
    path('studentCoursesAPI/<id>/grades', views.GradesInStudentAPI),
    path('studentAPI/grades', views.studentsAndGradesAPI),
    path('studentAPI/grades/<degree>', views.studentsAndGradesForDegreeAPI),
    

    # path('testAPI/', views.testAPI),
    
    # path('studentsToGradesAPI', views.studentsToGradesAPI),

    path('yearsAPI', views.YearsAPI),
    path('uploader', views.UploadAPI),
    path('courseUploader', views.UploadCoursesAPI),
    path('studentUploader', views.UploadStudentsAPI),
    path('gradeUploader', views.UploadGradesAPI),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
