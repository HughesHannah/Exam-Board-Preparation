from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from exam_board_preparation_app.serializers import DepartmentSerializer
from exam_board_preparation_app.models import Departments

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@csrf_exempt
def DepartmentAPI(request, id=0):
    if request.method == 'GET':
        departments = Departments.objects.all()
        department_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(department_serializer.data, safe=False)
    
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        departments = Departments.objects.get(id=department_data['id'])
        department_serializer = DepartmentSerializer(departments, data=department_data)
        if department_serializer.is_valid(): 
            department_serializer.save()
            return JsonResponse("update successful", safe=False)
        return JsonResponse("update failed", safe=False)
    
    
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
