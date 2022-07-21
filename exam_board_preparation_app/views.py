from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
import pandas as pd

from exam_board_preparation_app.serializers import DepartmentSerializer, ClassHeadSerializer, StudentSerializer
from exam_board_preparation_app.models import Departments, ClassHead, Student

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
    
@api_view(['POST'])
def UploadAPI(request):
    # if request.method == 'GET':
    #     students = Student.objects.all()
    #     student_serializer = StudentSerializer(students, many=True)
    #     return JsonResponse(student_serializer.data, safe=False)
    
    uploadFile = request.FILES['file']
    studentLevel = 0;
    if not uploadFile.name.endswith('.xlsx'):
        messages.error('request', 'This is not an excel file')
    
    df = pd.read_excel(
	    io = uploadFile,
	    sheet_name='static_numbers', 
	    header=0, 
	    usecols='A:S',  
	    skiprows=[1],  
	) 

    
    df[['Degree', 'Degree_Master']] = df['Degree'].str.split(', ', n=1, expand=True)
    df['Degree_Master'] = df['Degree_Master'].str.replace('MSci', 'True')
    df['Degree_Master'] = df['Degree_Master'].str.replace('BSc', 'False')
    df[['Degree', 'FR']] = df['Degree'].str.split('(', n=1, expand=True)
    df['FR'] = df['FR'].str.replace(')','').replace('FR','True').fillna('False')

    # print(df) 
    
    df_records = df.to_dict('records')
    
    
    model_instances = [Student(
        metriculationNumber=record['ID'],
        name=record['Name'],
        degreeTitle = record['Degree'],
        mastersStudent = record['Degree_Master'],
        fastRouteStudent = record['FR'],
        yearOfStudy = studentLevel,
    ) for record in df_records]

    Student.objects.bulk_create(model_instances)
    
    students = Student.objects.all()
    student_serializer = StudentSerializer(students, many=True)
    
    return JsonResponse(student_serializer.data, safe=False)
    
    

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ClassHeadAPI(request):
    user = request.user
    classHeads = ClassHead.objects.filter(user=user)
    serializer = ClassHeadSerializer(classHeads, many=True)
    return Response(serializer.data)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
