from django.urls import path
from .views import FatSecretFoodByID, FatSecretFoodSearch, AFood
urlpatterns = [
    path('id/<int:id>/', FatSecretFoodByID.as_view(), name='food'),
    path('nutrition/<str:search>/',
         FatSecretFoodSearch.as_view(), name='fat_secret'),
    path('myfood/<int:food_id>/', AFood.as_view(), name='a_food')
]
