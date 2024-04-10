from django.urls import path
from .views import FatSecretFoodByID, FatSecretFoodSearch
urlpatterns = [
    path('id/<int:id>/', FatSecretFoodByID.as_view(), name='food'),
    path('nutrition/<str:search>/',
         FatSecretFoodSearch.as_view(), name='fat_secret')
]
