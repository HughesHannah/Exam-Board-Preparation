from django.test import TestCase
from exam_board_preparation_app.models import *
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError


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
 
# class TestModelCreation(TestCase):
#     def number_too_long(self): 
#         student = Student.objects.create(matriculationNumber="123456789XXXXX", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False)
#         try:
#             student.full_clean()
#             self.fail("Student number too long")
#         except ValidationError:
#             pass
    
# class DeleteStudentDoesntDeleteYear(TestCase):
#     def setUp(self):
#         year = Year.objects.create(yearStart=2020, yearEnd=2021)
#         Student.objects.create(matriculationNumber="12345678", name="test", degreeTitle="CS", mastersStudent=True, fastRouteStudent=False, exitYear=year)

#     def test_delete_year(self):
#         deleteStudent = Student.objects.get(matriculationNumber="12345678")
#         deleteStudent.delete()
#         Year.objects.get(yearStart=2020)


########### Assignment Tests ################################# 

########### Exam Tests ################################# 

########### ClassHead Tests #################################        
        
########### API Tests #################################  


