from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('kontakt', views.kontakt, name='kontakt'),
    path('impressum', views.impressum, name='impressum'),
    path('f_a', views.f_a, name='f_a'),
    path('chat', views.chat, name='chat'),
]
