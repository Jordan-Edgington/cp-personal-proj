from django.urls import path
from .views import Meal_Gen
urlpatterns = [
    path('meal/', Meal_Gen.as_view(), name='meal_gen')
]
