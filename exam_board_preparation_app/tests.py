from django.test import TestCase
from exam_board_preparation_app.models import *
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError


########### Year Tests #################################

class DeleteYearDoesNotDeleteCourses(TestCase):
    def setUp(self):
        newYear = Year.objects.create(year="2021-2022")
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, year = newYear)
    def test_year_deletion(self):
        year = Year.objects.get(year="2021-2022")
        year.delete()
        Course.objects.get(classCode="TEST1234")
        
        
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
    def test_negative_credit_creation_not_possible(self):
        try:
            Course.objects.create(className="Course Name", credits=10, isTaught=False)
        except IntegrityError:
            pass        
        
class CourseCodeCannotBeLong(TestCase):
    def test_course_code_too_long(self):
        course = Course.objects.create(className="Course Name", classCode="COMPSCI1234XXXX", credits=10, isTaught=False)
        try:
            course.full_clean()
        except ValidationError:
            pass
            
class DeleteCourseDoesNotDeleteYear(TestCase):
    def setUp(self):
        newYear = Year.objects.create(year="2021-2022")
        Course.objects.create(classCode="TEST1234", className="Course Name", credits=10, year = newYear)
    def test_course_deletion(self):
        course= Course.objects.get(classCode="TEST1234")
        course.delete()
        Year.objects.get(year="2021-2022")
                   
        
        
########### Student Tests #################################       
 
########### Assignment Tests ################################# 

########### Exam Tests ################################# 

########### ClassHead Tests #################################        
        
    


