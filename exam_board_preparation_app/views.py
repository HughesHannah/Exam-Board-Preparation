from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
import pandas as pd
from exam_board_preparation_app.serializers import CourseSerializer, ClassHeadSerializer, StudentSerializer, YearSerializer
from exam_board_preparation_app.models import ClassHead, Student, Course, Year
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Students in Particular Course
@api_view(['GET'])
def StudentsInCourseAPI(request, year, code):
    dbYear = Year.objects.get(year=year)
    course = Course.objects.get(year=dbYear.id, classCode=code)
    students = course.students.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data) 

# All courses in particular year with particular ID    
@api_view(['GET'])
def IndividualCourseYearAPI(request, year, code):
    dbYear = Year.objects.get(year=year)
    courses = Course.objects.get(year=dbYear.id, classCode=code)
    serializer = CourseSerializer(courses, many=False)
    return Response(serializer.data) 
    
# All Courses    
@api_view(['GET'])
def CourseAPI(request, id=0):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)    

# All Courses in particular year
@api_view(['GET'])
def CourseYearAPI(request, year):
    dbYear = Year.objects.get(year=year)
    courses = Course.objects.filter(year=dbYear.id)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data) 

# All Years
@api_view(['GET'])
def YearsAPI(request):
    years = Year.objects.all()
    serializer = YearSerializer(years, many=True)
    return Response(serializer.data)  
    
# Uploading Courses    
@api_view(['POST'])
def UploadCoursesAPI(request):
    
    # get data from request
    uploadFile = request.FILES['file']
    courseYear = request.data['year']
    courseYearStart = courseYear.split('-')[0]
    
    # check it's the right format
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')
    
    # read file
    df = pd.read_excel(
	    io = uploadFile, 
	    header=0, 
	    usecols='A:E',    
	) 
    
    # create instances
    df_records = df.to_dict('records')
    
    # create courses from data
    course_instances = [Course(
        className=record['Name'],
        classCode=record['Code'], 
        credits = record['Credits'],
        isTaught = record['isTaught'],
        lecturerComments = record['Comments'],
        year = Year.objects.get(yearStart=courseYearStart),
    ) for record in df_records]

    print(course_instances)
    
    # add all student objects to database (ignores students already in database)
    Course.objects.bulk_create(course_instances, ignore_conflicts=True)
    
    courses = Course.objects.all()
    course_serializer = CourseSerializer(courses, many=True)
    
    return JsonResponse(course_serializer.data, safe=False)    
    
# Uploading Students and Courses  
@api_view(['POST'])
def UploadAPI(request):
    
    # get data from request
    uploadFile = request.FILES['file']
    studentLevel = request.data['level']
    chosenYear = '2020-2021'
    
    # check it's the right format
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')
    
    # read file
    df = pd.read_excel(
	    io = uploadFile,
	    sheet_name='static_numbers', 
	    header=0, 
	    usecols='A:S',  
	    skiprows=[1],  
	) 
    
    # clean file data
    df[['Degree', 'Degree_Master']] = df['Degree'].str.split(', ', n=1, expand=True)
    df['Degree_Master'] = df['Degree_Master'].str.replace('MSci', 'True')
    df['Degree_Master'] = df['Degree_Master'].str.replace('BSc', 'False')
    df[['Degree', 'FR']] = df['Degree'].str.split('(', n=1, expand=True)
    df['FR'] = df['FR'].str.replace(')','').replace('FR','True').fillna('False')
    
    # create instances
    df_records = df.to_dict('records')
    
    # create students from data
    student_instances = [Student(
        metriculationNumber=record['ID'],
        name=record['Name'],
        degreeTitle = record['Degree'],
        mastersStudent = record['Degree_Master'],
        fastRouteStudent = record['FR'],
        yearOfStudy = studentLevel,
    ) for record in df_records]

    # TODO: update student year/level if needed
    # add all student objects to database (ignores students already in database)
    Student.objects.bulk_create(student_instances, ignore_conflicts=True)
    
    ######################################
    # Add Students to Courses
    
    dfcs = pd.read_excel(
        io = uploadFile,
        sheet_name='static_numbers', 
        header=0,
        index_col=0, 
        usecols='A,D:S',  
	    skiprows=[1]
    ) 

    for courseName in dfcs: 
        counter = 0
        for values in dfcs[courseName]:
            counter = counter+1
            if (values == 1):
                # get course with matching name and year
                dbYear = Year.objects.get(year=chosenYear)
                courseToAddTo = Course.objects.get(year=dbYear, className=courseName)
                
                # get student object from matriculation number
                studentToAdd = Student.objects.get(metriculationNumber = dfcs.index[counter-1])
                
                # add student to course
                courseToAddTo.students.add(studentToAdd)
    
    students = Student.objects.all()
    student_serializer = StudentSerializer(students, many=True)
    
    return JsonResponse(student_serializer.data, safe=False)
    
# Individual Student   
@api_view(['GET'])
def IndividualStudentAPI(request, id):
    students = Student.objects.get(metriculationNumber=id)
    serializer = StudentSerializer(students, many=False)
    return Response(serializer.data)

# Get Courses for Individual Student
@api_view(['GET'])
def IndividualStudentCoursesAPI(request, id):
    student = Student.objects.get(metriculationNumber=id)
    courses = Course.objects.filter(students = student)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

# All Students    
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def StudentAPI(request, id=0):
    # TODO: return only students accociated with user level
    # user = request.user 
    # classHead = ClassHead.objects.filter(user=user)
    # students = Student.objects.filter(yearOfStudy=classHead.level)
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

# Class Heads    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ClassHeadAPI(request):
    user = request.user
    classHeads = ClassHead.objects.filter(user=user)
    serializer = ClassHeadSerializer(classHeads, many=True)
    return Response(serializer.data)


# Tokens 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
