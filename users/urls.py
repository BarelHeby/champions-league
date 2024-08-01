from django.urls import path
from . import views
urlpatterns = [
    path('login', views.login),
    path('register', views.register),
    path('<int:id>', views.user),
    path('', views.user),
    path('table', views.table),
    path('validate/', views.validate),
    path('changeadmin/', views.change_admin),
]
