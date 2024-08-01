
from django.urls import path
from . import views

urlpatterns = [
    path('', views.match),
    path('<int:id>', views.match)
]