from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
import pandas as pd
from exam_board_preparation_app.serializers import CourseSerializer, ClassHeadSerializer, GradedWorkSerializer, StudentSerializer, YearSerializer
from exam_board_preparation_app.models import ClassHead, GradedWork, Student, Course, Year
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import date
from itertools import chain


########## Get Course(s) APIs ###############################

# All Courses
@api_view(['GET'])
def CourseAPI(request, id=0):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

# All Courses in particular year


@api_view(['GET'])
def CourseYearAPI(request, year):
    start = year.split('-')[0]
    dbYear = Year.objects.get(yearStart=start)
    courses = Course.objects.filter(year=dbYear.id)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

# All courses in particular year with particular ID


@api_view(['GET'])
def IndividualCourseYearAPI(request, year, code):
    start = year.split('-')[0]
    dbYear = Year.objects.get(yearStart=start)
    courses = Course.objects.get(year=dbYear.id, classCode=code)
    serializer = CourseSerializer(courses, many=False)
    return Response(serializer.data)

# Get Courses for Individual Student


@api_view(['GET'])
def IndividualStudentCoursesAPI(request, id):
    student = Student.objects.get(metriculationNumber=id)
    courses = Course.objects.filter(students=student)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

########## Get Grade(s) APIs ###############################

# get all grades for a particular course


@api_view(['GET'])
def GradesInCourseAPI(request, year, code):
    start = year.split('-')[0]
    # get year, so that we can filter courses by year
    dbYear = Year.objects.get(yearStart=start)
    # get course so we can grab all the students off it
    course = Course.objects.get(year=dbYear.id, classCode=code)
    # get the graded works for that course
    courseGrades = GradedWork.objects.filter(course=course)

    serializer = GradedWorkSerializer(courseGrades, many=True)
    return Response(serializer.data)

# get all graded work information for a particular course


@api_view(['GET'])
def GradesInStudentAPI(request, id):
    student = Student.objects.get(metriculationNumber=id)

    # get the graded works for that course
    studentGrades = GradedWork.objects.filter(student=student)

    serializer = GradedWorkSerializer(studentGrades, many=True)
    return Response(serializer.data)


########## Get Student(s) APIs ###############################

# All Students
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def StudentAPI(request):
    # get the user and classhead object
    user = request.user
    classHead = ClassHead.objects.filter(user=user)

    # get the current year
    today = date.today()
    if (today.month >= 9):
        currentYear = Year.objects.get(yearStart=today.year)
    else:
        currentYear = Year.objects.get(yearEnd=today.year)

    # can they view all?
    if (classHead[0].level == 0):
        # view all students
        students = Student.objects.all()

    else:
        # view students for that level
        # work out exit years
        masterExit = (5-classHead[0].level)+currentYear.yearEnd
        bachelorExit = (4-classHead[0].level)+currentYear.yearEnd

        # get exit year objects
        exitYearForMasters = Year.objects.get(yearEnd=masterExit)
        exitYearForBachelor = Year.objects.get(yearEnd=bachelorExit)

        # get students based on these exit years
        masterStudents = Student.objects.filter(
            exitYear=exitYearForMasters, mastersStudent=True)
        bachelorStudents = Student.objects.filter(
            exitYear=exitYearForBachelor, mastersStudent=False)
        students = chain(masterStudents, bachelorStudents)

    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def StudentsInCourseAPI(request, year, code):
    start = year.split('-')[0]
    # get year, so that we can filter courses by year
    dbYear = Year.objects.get(yearStart=start)
    # get course
    course = Course.objects.get(year=dbYear.id, classCode=code)
    # get students
    students = course.students.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

# Individual Student


@api_view(['GET'])
def IndividualStudentAPI(request, id):
    students = Student.objects.get(metriculationNumber=id)
    serializer = StudentSerializer(students, many=False)
    return Response(serializer.data)


########## Get Year(s) APIs ###############################

# All Years
@api_view(['GET'])
def YearsAPI(request):
    years = Year.objects.all()
    serializer = YearSerializer(years, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def currentYearAPI(request):
    today = date.today()
    if (today.month >= 9):
        yearObj = Year.objects.get(yearStart=today.year)
    else:
        yearObj = Year.objects.get(yearEnd=today.year)
    serializer = YearSerializer(yearObj, many=False)
    return Response(serializer.data)

########## Get Class Head(s) APIs ###############################

# Return Class Head Object for current user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ClassHeadAPI(request):
    user = request.user
    classHeads = ClassHead.objects.filter(user=user)
    serializer = ClassHeadSerializer(classHeads, many=True)
    return Response(serializer.data)


########## Uploads ###############################

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
        io=uploadFile,
        header=0,
        usecols='A:E',
    )

    # create instances
    df_records = df.to_dict('records')

    # create courses from data
    course_instances = [Course(
        className=record['Name'],
        classCode=record['Code'],
        credits=record['Credits'],
        isTaught=record['isTaught'],
        lecturerComments=record['Comments'],
        year=Year.objects.get(yearStart=courseYearStart),
    ) for record in df_records]

    print(course_instances)

    # add all student objects to database (ignores students already in database)
    Course.objects.bulk_create(course_instances, ignore_conflicts=True)

    courses = Course.objects.all()
    course_serializer = CourseSerializer(courses, many=True)

    return JsonResponse(course_serializer.data, safe=False)

# Uploading Students to Courses


@api_view(['POST'])
def UploadAPI(request):

    # get data from request
    uploadFile = request.FILES['file']

    chosenYear = request.data['year']
    chosenYearStart = chosenYear.split('-')[0]

    # check it's the right format
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')

    # read the file
    dfcs = pd.read_excel(
        io=uploadFile,
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
                yearOfCourse = Year.objects.get(yearStart=chosenYearStart)
                courseToAddTo = Course.objects.get(
                    year=yearOfCourse, className=courseName)

                # get student object from matriculation number
                studentToAdd = Student.objects.get(
                    metriculationNumber=dfcs.index[counter-1])

                # add student to course
                courseToAddTo.students.add(studentToAdd)

    students = Student.objects.all()
    student_serializer = StudentSerializer(students, many=True)

    return JsonResponse(student_serializer.data, safe=False)

# Uploading Students


@api_view(['POST'])
def UploadStudentsAPI(request):
    # Get file
    uploadFile = request.FILES['file']

    # check it's the right format
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')

    # read file
    df = pd.read_excel(
        io=uploadFile,
        sheet_name='Sheet1',
        header=0,
        usecols='A:D',
    )

    # clean file data
    df[['Degree', 'Degree_Master']] = df['Degree'].str.split(
        ', ', n=1, expand=True)
    df['Degree_Master'] = df['Degree_Master'].str.replace('MSci', 'True')
    df['Degree_Master'] = df['Degree_Master'].str.replace('BSc', 'False')
    df[['Degree', 'FR']] = df['Degree'].str.split('(', n=1, expand=True)
    df['FR'] = df['FR'].str.replace(')', '').replace(
        'FR', 'True').fillna('False')
    df[['exitStart', 'exitEnd']] = df['ExitYear'].str.split(
        '-', n=1, expand=True)

    # create instances
    df_records = df.to_dict('records')

    # create students from data
    student_instances = [Student(
        metriculationNumber=record['ID'],
        name=record['Name'],
        degreeTitle=record['Degree'],
        mastersStudent=record['Degree_Master'],
        fastRouteStudent=record['FR'],
        exitYear=Year.objects.get(yearStart=record['exitStart'])
    ) for record in df_records]

    # add all student objects to database (ignores students already in database)
    Student.objects.bulk_create(student_instances, ignore_conflicts=True)

    students = Student.objects.all()
    student_serializer = StudentSerializer(students, many=True)

    return JsonResponse(student_serializer.data, safe=False)


@api_view(['POST'])
def UploadGradesAPI(request):
    # Get file
    uploadFile = request.FILES['file']

    # check it's the right format
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')

    sheetNames = ["Course1", "Course2", "Course3", "Course4", "Course5",
                  "Course6", "Course7", "Course8", "Course9", "Course10",
                  "Course11", "Course12", "Course13", "Course14", "Course15",
                  "Project3", "Project4", "Project5"]

    for sheetName in sheetNames:

        # Get Work weightings
        cw = df = pd.read_excel(
            io=uploadFile,
            sheet_name=sheetName,
            index_col=0,
        )

        # clean
        cw = cw[0:1]
        cw = cw.transpose()
        cw.columns = ['Weight']
        cw['Name'] = cw.index
        cw = cw.drop('Course Code')
        cw = cw.drop('Metriculation')
        cw = cw.drop('Student Name')
        cw = cw.drop('Total')
        cw = cw.drop('Final Grade')

        # create instances
        cw_records = cw.to_dict('record')

        for record in cw_records:
            nameOfWork = record['Name']
            typeOfWork = nameOfWork[0]
            workWeighting = record['Weight']

            # Get students and grades
            df = pd.read_excel(
                io=uploadFile,
                sheet_name=sheetName,
                header=0,
                index_col=0,
                skiprows=[1]
            )
            # create instances
            df_records = df.to_dict('records')

            grade_instances = [GradedWork(
                name=nameOfWork,
                course=Course.objects.get(classCode=record['Course Code']),
                student=Student.objects.get(
                    metriculationNumber=record['Metriculation']),
                weighting=workWeighting,
                gradeMark=record[nameOfWork],
                type=typeOfWork

            ) for record in df_records]

            GradedWork.objects.bulk_create(
                grade_instances, ignore_conflicts=True)

    return JsonResponse("Success", safe=False)


########## Tokens ###############################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
