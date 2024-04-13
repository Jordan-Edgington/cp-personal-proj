from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.views import TokenReq
from food_proj.settings import env
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from datetime import datetime
from .serializers import MealSerializer, MealViewSerializer
from datetime import datetime
from user_app.models import UserAccount
from food_app.serializers import FoodSerializer
from meal_app.models import Meal

'''
{
    foods: [
        {api_food_id:id, servings:num},
        {api_food_id:id, servings:num},
        {api_food_id:id, servings:num}
    ]
}
'''


class MyMealView(TokenReq):
    def get(self, request):
        data = request.data.copy()
        meals = MealViewSerializer(Meal.objects.filter(
            user=request.user).order_by('-meal_date_time'), many=True)
        if meals:
            return Response(meals.data, status=HTTP_200_OK)
        return Response({"Failure": "Could not get meals"}, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data.copy()
        print('MEAL: ', data)
        # data should contain object with an array of foods. each food object will have {api_food_id:num, servings:num}
        new_meal_ser = MealSerializer(data=request.data)
        if new_meal_ser.is_valid():
            user = UserAccount.objects.get(id=request.user.id)
            new_meal = new_meal_ser.save(
                user=user, meal_date_time=datetime.now())
        else:
            print(1)
            return Response({"Failure": "Meal was not valid"}, status=HTTP_400_BAD_REQUEST)
        print(type(new_meal))
        print(f'DATA: {data}')
        foods = data["foods"]
        for food_data in foods:
            new_food = FoodSerializer(data=food_data)
            if new_food.is_valid():
                new_food.save(meal=new_meal)
            else:
                print(2)
                return Response({"Failed": "A food you inputted may be invalid"}, status=HTTP_400_BAD_REQUEST)
        return Response({"Success": "Meal Created"}, status=HTTP_201_CREATED)


class AMealView(TokenReq):
    def delete(self, request, meal_id):
        meal = get_object_or_404(Meal, id=meal_id)
        meal.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class AllMealsView(TokenReq):
    def get(self, request):
        meals = Meal.objects.order_by('-meal_date_time').all()
        serializer = MealViewSerializer(meals, many=True)
        if meals:
            return Response(serializer.data, status=HTTP_200_OK)
        return Response({"Failure": "Could not get meals"}, status=HTTP_400_BAD_REQUEST)
