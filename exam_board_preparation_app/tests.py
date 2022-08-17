from django.test import TestCase
from exam_board_preparation_app.models import *
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from exam_board_preparation_app.views import *
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate


########### Year Tests #################################

class DeleteYearDoesNotDeleteCourses(TestCase):
    def setUp(self):
        newYear = Year.objects.create(yearStart = 2021, yearEnd = 2020)
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, year = newYear)
    def test_year_deletion(self):
        year = Year.objects.get(yearStart=2021)
        year.delete()
        Course.objects.get(classCode="TEST1234")
        
class YearValidation(TestCase):
    def test_start_under_2000(self): 
        try:
            Year.objects.create(yearStart=1, yearEnd=2020)
            self.fail("Start year is accepted at 1")
        except AssertionError:
            pass
    def test_end_under_2000(self): 
        try:
            Year.objects.create(yearStart=2020, yearEnd=1999)
            self.fail("End year is accepted at 1999")
        except AssertionError:
            pass
    def test_start_over_2000(self): 
        try:
            Year.objects.create(yearStart=3001, yearEnd=2020)
            self.fail("Start year is accepted at 3001")
        except AssertionError:
            pass
    def test_end_over_2000(self): 
        try:
            Year.objects.create(yearStart=2020, yearEnd=1000000)
            self.fail("End year is accepted at 1000000")
        except AssertionError:
            pass
  
class DeleteStudentDoesntDeleteYear(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)
    def test_delete_year(self):
        deleteYear = Year.objects.get(yearStart=2020)
        deleteYear.delete()
        Student.objects.get(matriculationNumber="12345678")
        
########### Course Tests #################################
class CourseLecturerCommentsDefaultNull(TestCase):
    def setUp(self):
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, isTaught=True)
    def test_comments_are_null(self):
        course = Course.objects.get(classCode="TEST1234")
        self.assertEqual(course.lecturerComments, None)
        
class CourseIsTaughtDefaultTrue(TestCase):
    def setUp(self):
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, lecturerComments="comment")
    def test_comments_are_null(self):
        course = Course.objects.get(classCode="TEST1234")
        self.assertEqual(course.isTaught, True)

class CourseCreditsPositive(TestCase):
    def test_negative_credit_creation_not_possible(self):
        try:
            Course.objects.create(className="Course Name", classCode="TEST1234", credits=-10, isTaught=False)
        except IntegrityError:
            pass
        
class CourseCodeCannotBeNull(TestCase):
    def test_course_code_null(self):
        try:
            Course.objects.create(className="Course Name", credits=10, isTaught=False)
        except IntegrityError:
            pass        
        
class CourseCodeCannotBeLong(TestCase):
    def test_course_code_too_long(self):
        course = Course.objects.create(className="Course Name", classCode="COMPSCI1234XXXX", credits=10, isTaught=False)
        try:
            course.full_clean()
            self.fail("Course code too long")
        except ValidationError:
            pass
                
class DeleteCourseDoesNotDeleteYear(TestCase):
    def setUp(self):
        newYear = Year.objects.create(yearStart = 2021, yearEnd = 2020)
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, year = newYear)
    def test_course_deletion(self):
        course= Course.objects.get(classCode="TEST1234")
        course.delete()
        Year.objects.get(yearStart=2021)
                   
      
########### Student Tests #################################       
 
class TestModelCreation(TestCase):
    def number_too_long(self): 
        student = Student.objects.create(matriculationNumber="123456789XXXXX", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False)
        try:
            student.full_clean()
            self.fail("Student number too long")
        except ValidationError:
            pass
    
class DeleteStudentDoesntDeleteYear(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)

    def test_delete_year(self):
        deleteStudent = Student.objects.get(matriculationNumber="12345678")
        deleteStudent.delete()
        Year.objects.get(yearStart=2020)

# class DeleteStudentDeletesComment(TestCase):
#     def setUp(self):
#         year = Year.objects.create(yearStart=2020, yearEnd=2021)
#         user = User.objects.create(username='testUser')
#         student = Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)
#         StudentComment.objects.create(student = student, user=user, subjectLine="test", comment= "test comment")

#     def test_delete_comment(self):
#             deleteStudent = Student.objects.get(matriculationNumber="12345678")
#             deleteStudent.delete()
#             user = User.objects.get(username='testUser')
#             if (StudentComment.objects.get(user=user).DoesNotExist):
#                 FAIL_FAST
            

            
            
            
            
    
    
########### GradedWork Tests ################################# 



########### ClassHead Tests #################################    

########### StudentComment Tests #################################   

class DeleteUserDoesntDeleteComment(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        user = User.objects.create(username='testUser')
        student = Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)
        StudentComment.objects.create(student = student, user=user, subjectLine="test", comment= "test comment")

    def test_delete_comment(self):
            getStudent = Student.objects.get(matriculationNumber="12345678")
            user = User.objects.get(username='testUser')
            user.delete()
            StudentComment.objects.get(student=getStudent) 
        
########### API Tests #################################  
class testClassHeadAPI(TestCase):
    def setUp(self):
        user = User.objects.create(username='Glasgow', password='secret')
        ClassHead.objects.create(user=user)
    def testClassHeadAPIResponse(self):
        factory = APIRequestFactory()
        user = User.objects.get(username='Glasgow')
        classHead = ClassHead.objects.get(user=user)
        request = factory.get('classheads')
        force_authenticate(request, user=user)
        response = ClassHeadAPI(request)
        self.assertTrue(response.status_code == 200)
        # print(response.data)
        # self.assertTrue(classHead in response.data)
        
class testStudentAPI(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        user = User.objects.create(username='Glasgow', password='secret')
        ClassHead.objects.create(user=user)
        Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)
        
    def testStudentAPIResponse(self):
        factory = APIRequestFactory()
        user = User.objects.get(username='Glasgow')
        request = factory.get('studentAPI/')
        force_authenticate(request, user=user)
        response = StudentAPI(request)
        self.assertTrue(response.status_code == 200)
        
    def testStudentGradesAPI(self):
        factory = APIRequestFactory()
        user = User.objects.get(username='Glasgow')
        request = factory.get('studentAPI/grades')
        force_authenticate(request, user=user)
        response = studentsAndGradesAPI(request)
        self.assertTrue(response.status_code == 200)  
        
    def testStudentGradesforDegreeAPI(self):
        factory = APIRequestFactory()
        user = User.objects.get(username='Glasgow')
        degree = Student.objects.get(matriculationNumber="12345678").degreeTitle
        request = factory.get('studentAPI/grades/' + degree)
        force_authenticate(request, user=user)
        response = studentsAndGradesAPI(request)
        self.assertTrue(response.status_code == 200)      
                 
class testCourseAPI(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, isTaught=True, year=year)
        
    def testCourseAPIResponse(self):
        factory = APIRequestFactory()
        request = factory.get('courseAPI/')
        response = CourseAPI(request)
        self.assertTrue(response.status_code == 200)    
        
    def testCourseAPIYearResponse(self):
        factory = APIRequestFactory()
        year = Year.objects.get(yearStart=2020)
        request = factory.get('courseAPI/' + year.year)
        response = CourseYearAPI(request, year.year)
        self.assertTrue(response.status_code == 200)
        
    def testGradesInCourseAPIResponse(self):
        factory = APIRequestFactory()
        year = Year.objects.get(yearStart=2020)
        course = Course.objects.get(classCode="TEST1234")
        request = factory.get('courseAPI/' + year.year + '/'+ course.classCode+'/students/grades')
        response = GradesInCourseAPI(request, year.year, course.classCode)
        self.assertTrue(response.status_code == 200)  
        
    def testStudentsInCourseAPIResponse(self):
        factory = APIRequestFactory()
        year = Year.objects.get(yearStart=2020)
        course = Course.objects.get(classCode="TEST1234")
        request = factory.get('courseAPI/' + year.year + '/'+ course.classCode+'/students')
        response = WorksInCourseAPI(request, year.year, course.classCode)
        self.assertTrue(response.status_code == 200)    
        
    def testSpecificCourseAPIResponse(self):
        factory = APIRequestFactory()
        year = Year.objects.get(yearStart=2020)
        course = Course.objects.get(classCode="TEST1234")
        request = factory.get('courseAPI/' + year.year + '/'+ course.classCode)
        response = IndividualCourseYearAPI(request, year.year, course.classCode)
        self.assertTrue(response.status_code == 200)        
        
class testDegreeClassificationAPI(TestCase):
    def testDegreeClassificationAPIResponse(self):
        factory = APIRequestFactory()
        request = factory.get('degreeClassificationAPI/')
        response = degreeClassificationAPI(request)
        self.assertTrue(response.status_code == 200)
        
class testIndividualStudentAPI(TestCase):
    def setUp(self):
        year = Year.objects.create(yearStart=2020, yearEnd=2021)
        Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)
        
    def testIndividualStudentAPIResponse(self):
        factory = APIRequestFactory()
        student = Student.objects.get(matriculationNumber="12345678")
        request = factory.get('individualStudentAPI/'+ student.matriculationNumber)
        response = IndividualStudentAPI(request, student.matriculationNumber)
        self.assertTrue(response.status_code == 200)   
        
    def testIndividualStudentCommentsAPIResponse(self):
        factory = APIRequestFactory()
        student = Student.objects.get(matriculationNumber="12345678")
        request = factory.get('individualStudentAPI/'+ student.matriculationNumber+'/comments')
        response = IndividualStudentCommentsAPI(request, student.matriculationNumber)
        self.assertTrue(response.status_code == 200)        
        
    def testIndividualStudentCoursesAPIResponse(self):
        factory = APIRequestFactory()
        student = Student.objects.get(matriculationNumber="12345678")
        request = factory.get('studentCoursesAPI/'+ student.matriculationNumber)
        response = IndividualStudentCommentsAPI(request, student.matriculationNumber)
        self.assertTrue(response.status_code == 200)     