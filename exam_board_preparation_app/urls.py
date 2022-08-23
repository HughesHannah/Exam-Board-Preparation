from django.urls import path
from exam_board_preparation_app import views

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # GET
    path('classheads', views.ClassHeadAPI),
    path('studentAPI/', views.StudentAPI),
    path('studentAPI/grades', views.studentsAndGradesAPI),
    path('studentAPI/grades/<degree>', views.studentsAndGradesForDegreeAPI),
    
    path('courseAPI/', views.CourseAPI),
    path('courseAPI/simple', views.simpleCourseAPI),
    path('courseAPI/<year>/<code>/students', views.studentsAndGradesForCourseAPI),
    path('courseAPI/<year>/<code>/students/grades', views.GradesInCourseAPI),
    path('courseAPI/<year>/<code>/grades', views.WorksInCourseAPI),
    path('courseAPI/<year>/<code>', views.IndividualCourseYearAPI),
    path('courseAPI/<year>', views.CourseYearAPI),
    
    path('degreeClassificationAPI/', views.degreeClassificationAPI),
    path('gradesAPI/Preponderance', views.allPreponderanceGradedWork),
    
    path('individualStudentAPI/<id>', views.IndividualStudentAPI),
    path('individualStudentAPI/<id>/comments', views.IndividualStudentCommentsAPI),
    path('studentCoursesAPI/<id>', views.IndividualStudentCoursesAPI),
    path('studentCoursesAPI/<id>/grades', views.GradesInStudentAPI),
    path('yearsAPI', views.YearsAPI),
    
    
    # POST
    path('preponderanceAPI/<id>', views.AddPreponderanceAPI),
    path('courseAPI/<year>/<code>/moderateWork', views.ModerateGradedWorkAPI),
    path('courseAPI/<year>/<code>/moderateAll', views.ModerateCourseAPI),
    path('classificationChangeAPI/', views.ClassificationChangeAPI),
    path('uploader', views.UploadAPI),
    path('courseUploader', views.UploadCoursesAPI),
    path('studentUploader', views.UploadStudentsAPI),
    path('gradeUploader', views.UploadGradesAPI),
    path('addCommentAPI/<id>', views.AddCommentAPI),

    # TOKENS
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
