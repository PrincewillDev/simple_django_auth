from django.urls import path
from .views import RegisterView

app_name = 'core'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
]