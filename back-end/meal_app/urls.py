from django.urls import path
from .views import MyMealView, AMealView, AllMealsView
urlpatterns = [
    path('', MyMealView.as_view(), name='meal'),
    path('<int:meal_id>/', AMealView.as_view(), name='a_meal'),
    path('all/', AllMealsView.as_view(), name='all_meals')
]
