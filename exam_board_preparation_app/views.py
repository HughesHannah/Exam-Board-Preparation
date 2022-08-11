from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
import pandas as pd
from exam_board_preparation_app.serializers import *
from exam_board_preparation_app.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import date
from itertools import chain


# Testing





    


########## Helper Functions ###############################

def getStudentsByLevel(level):
    # get the current year
    today = date.today()
    if (today.month >= 9):
        currentYear = Year.objects.get(yearStart=today.year)
    else:
        currentYear = Year.objects.get(yearEnd=today.year)
    
    # view students for that level
    # work out exit years
    masterExit = (5-level)+currentYear.yearEnd
    bachelorExit = (4-level)+currentYear.yearEnd

    # get exit year objects
    exitYearForMasters = Year.objects.get(yearEnd=masterExit)
    exitYearForBachelor = Year.objects.get(yearEnd=bachelorExit)

    # get students based on these exit years
    masterStudents = Student.objects.filter(
        exitYear=exitYearForMasters, mastersStudent=True)
    bachelorStudents = Student.objects.filter(
        exitYear=exitYearForBachelor, mastersStudent=False)
    students = chain(masterStudents, bachelorStudents) 
    
    return students
    
def getStudentsForUser(user):
    # get the user and classhead object
    classHead = ClassHead.objects.filter(user=user)

    # can they view all?
    if (classHead[0].level == 0):
        # view all students
        students = Student.objects.all()

    else:
        students = getStudentsByLevel(classHead[0].level)
        
    return students
    
    
def getStudentsbyLevelandDegree(level, degree):  
    # get the current year
    today = date.today()
    if (today.month >= 9):
        currentYear = Year.objects.get(yearStart=today.year)
    else:
        currentYear = Year.objects.get(yearEnd=today.year)
    
    # view students for that level
    # work out exit years
    masterExit = (5-level)+currentYear.yearEnd
    bachelorExit = (4-level)+currentYear.yearEnd

    # get exit year objects
    exitYearForMasters = Year.objects.get(yearEnd=masterExit)
    exitYearForBachelor = Year.objects.get(yearEnd=bachelorExit)

    # get students based on these exit years
    masterStudents = Student.objects.filter(
        exitYear=exitYearForMasters, mastersStudent=True, degreeTitle=degree)
    bachelorStudents = Student.objects.filter(
        exitYear=exitYearForBachelor, mastersStudent=False, degreeTitle=degree)
    students = chain(masterStudents, bachelorStudents) 
    
    return students  
    
def getStudentsByUserandDegree(user, degree):
    # get the user and classhead object
    classHead = ClassHead.objects.filter(user=user)

    # can they view all?
    if (classHead[0].level == 0):
        # view all students
        students = Student.objects.filter(degreeTitle=degree)

    else:
        students = getStudentsbyLevelandDegree(classHead[0].level, degree)
        
    return students

########## Get Course(s) APIs ###############################

# All Courses
@api_view(['GET'])
def CourseAPI(request, id=0):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def simpleCourseAPI(request, id=0):
    courses = Course.objects.all()
    serializer = SimpleCourseSerializer(courses, many=True)
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
    student = Student.objects.get(matriculationNumber=id)
    courses = Course.objects.filter(students=student)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


### Course Moderation ###

# Moderate a Coursework
@api_view(['POST'])
def ModerateGradedWorkAPI(request, year, code):

    # get data from request
    gradedWorkToModerate = request.data['work']
    newModeration = request.data['moderation']
    
    yearStart = year.split('-')[0]

    y = Year.objects.get(yearStart=yearStart)
    c = Course.objects.get(classCode=code, year=y)
    works = GradedWork.objects.filter(name=gradedWorkToModerate, course = c)
    
    for work in works:
        work.moderation=newModeration
        work.save()

    return JsonResponse("Success", safe=False)

# Moderate a Course
@api_view(['POST'])
def ModerateCourseAPI(request, year, code):

    # get data from request
    newModeration = request.data['moderation']
    
    yearStart = year.split('-')[0]

    y = Year.objects.get(yearStart=yearStart)
    c = Course.objects.get(classCode=code, year=y)
    works = GradedWork.objects.filter(course = c)
    
    for work in works:
        work.moderation=newModeration
        work.save()

    return JsonResponse("Success", safe=False)

########## Get Grade(s) APIs ###############################

# get all grades for a particular course
@api_view(['GET'])
def GradesInCourseAPI(request, year, code):
    start = year.split('-')[0]
    # get year, so that we can filter courses by year
    dbYear = Year.objects.get(yearStart=start)
    # get course so we can grab all the students off it
    course = Course.objects.get(year=dbYear.id, classCode=code)
    
    students = course.students.all()
    serializer = StudentsToGradesSerializer(students, many=True)
    return Response(serializer.data)
    
# get all grades for a particular course
@api_view(['GET'])
def WorksInCourseAPI(request, year, code):
    start = year.split('-')[0]
    # get year, so that we can filter courses by year
    dbYear = Year.objects.get(yearStart=start)
    # get course so we can grab all the students off it
    course = Course.objects.get(year=dbYear.id, classCode=code)
    works = GradedWork.objects.filter(course=course)
    serializer = SimpleGradedWorkSerializer(works, many=True)
    return Response(serializer.data)

# get all grades for a student
@api_view(['GET'])
def GradesInStudentAPI(request, id):
    student = Student.objects.get(matriculationNumber=id)

    # get the graded works for that course
    studentGrades = GradedWork.objects.filter(student=student)

    serializer = SimpleGradedWorkSerializer(studentGrades, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def allPreponderanceGradedWork(request):
    # get the user 
    user = request.user
    # get students for that user
    students = getStudentsForUser(user)
        
    gradedWorks = GradedWork.objects.filter(student__in = students).exclude(preponderance = 'NA') 
    serializer = GradedWorkSerializer(gradedWorks, many=True)
    return Response(serializer.data)   
    

########## Get Student(s) APIs ###############################

# All Students
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def StudentAPI(request):
    # get user
    user = request.user
    # get their students
    students = getStudentsForUser(user)
    # serialize and return data
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

# get All Students and their Grades
@api_view(['GET'])
def studentsAndGradesAPI(request):
    students = getStudentsForUser(request.user)
    serializer = StudentsToGradesSerializer(students, many=True)
    return Response(serializer.data)

# get All Students for a degree and their Grades
@api_view(['GET'])
def studentsAndGradesForDegreeAPI(request, degree):
    students = getStudentsByUserandDegree(request.user, degree)
    serializer = StudentsToGradesSerializer(students, many=True)
    return Response(serializer.data)

# get Students and their Grades for a Course
@api_view(['GET'])
def studentsAndGradesForCourseAPI(request, year, code):
    start = year.split('-')[0]
    dbYear = Year.objects.get(yearStart=start)
    course = Course.objects.get(year=dbYear.id, classCode=code)
    students = course.students.all()
    
    serializer = StudentsToGradesSerializer(students, many=True)
    return Response(serializer.data)

# Individual Student
@api_view(['GET'])
def IndividualStudentAPI(request, id):
    students = Student.objects.get(matriculationNumber=id)
    serializer = StudentSerializer(students, many=False)
    return Response(serializer.data)

### Add Preponderance ###
@api_view(['POST'])
def AddPreponderanceAPI(request, id):

    # get data from request
    courseFromRequest = request.data['course']
    courseYearStartFromRequest = request.data['courseYearStart']
    assignmentFromRequest = request.data['assignment']
    preponderanceFromRequest = request.data['preponderance']

    y = Year.objects.get(yearStart=courseYearStartFromRequest)
    c = Course.objects.get(className=courseFromRequest, year=y)
    s = Student.objects.get(matriculationNumber=id)
    work = GradedWork.objects.get(course = c, name=assignmentFromRequest, student=s)
    
    
    work.preponderance=preponderanceFromRequest
    work.save()

    return JsonResponse("Success", safe=False)

# Individual Student Comments
@api_view(['GET'])
def IndividualStudentCommentsAPI(request, id):
    student = Student.objects.get(matriculationNumber=id)
    studentComment_set = StudentComment.objects.filter(student = student)
    serializer = CommentSerializer(studentComment_set, many=True)
    return Response(serializer.data)

########## Get Year(s) APIs ###############################

# All Years
@api_view(['GET'])
def YearsAPI(request):
    years = Year.objects.all()
    serializer = YearSerializer(years, many=True)
    return Response(serializer.data)

########## Get Class Head(s) APIs ###############################

# Return Class Head Object for current user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ClassHeadAPI(request):
    user = request.user
    classHeads = ClassHead.objects.get(user=user)
    serializer = ClassHeadSerializer(classHeads, many=False)
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
                    matriculationNumber=dfcs.index[counter-1])

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
        matriculationNumber=record['ID'],
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

# Uploading Grades
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
        cw = cw.drop('Matriculation')
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
                    matriculationNumber=record['Matriculation']),
                weighting=workWeighting,
                gradeMark=record[nameOfWork],
                type=typeOfWork

            ) for record in df_records]

            GradedWork.objects.bulk_create(
                grade_instances, ignore_conflicts=True)

    return JsonResponse("Success", safe=False)

# Uploading Comments
@api_view(['POST'])
def AddCommentAPI(request, id):
    # get the student
    studentFromRequest = Student.objects.get(matriculationNumber=id)
    
    # get the user
    userFromRequest = request.user
    
    # get comment details
    subjectLineFromRequest = request.data['subjectLine']
    commentBodyFromRequest = request.data['commentBody']
    
    # create comment from data
    StudentComment.objects.create(
        student = studentFromRequest,
        user = userFromRequest,
        subjectLine = subjectLineFromRequest,
        comment = commentBodyFromRequest
    )

    comments = StudentComment.objects.all()
    comment_serializer = CommentSerializer(comments, many=True)

    return JsonResponse(comment_serializer.data, safe=False)

 
########## Degree Classifications ###############################    
   
# Degree Classification Information
@api_view(['GET'])
def degreeClassificationAPI(request):
    classifications = DegreeClassification.objects.all()
    serializer = DegreeClassificationSerializer(classifications, many=True)
    return Response(serializer.data)
   

########## Tokens ###############################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
