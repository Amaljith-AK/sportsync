from django.urls import path
from django.http import JsonResponse
from .views import predict

def health(request):
    return JsonResponse({'status':'ok'})

urlpatterns = [
    path('predict',predict,name='predict'),
    path('health',health,name='health')
]
