from django.urls import path
from .views import MealView, AMealView
urlpatterns = [
    path('', MealView.as_view(), name='meal'),
    path('<int:meal_id>/', AMealView.as_view(), name='a_meal')
]
