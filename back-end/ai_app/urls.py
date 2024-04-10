from django.urls import path
from .views import Meal_Gen, New_Meal
urlpatterns = [
    path('meal/', Meal_Gen.as_view(), name='meal_gen'),
    path('new_meal/', New_Meal.as_view(), name='new_meal')
]
