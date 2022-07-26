from django.test import TestCase
from django.db.utils import IntegrityError

from exam_board_preparation_app.models import *

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
            Course.objects.create(className="Project Name", credits=-10, isTaught=False)
        except IntegrityError:
            pass
        

################################################################        
        
        
    


