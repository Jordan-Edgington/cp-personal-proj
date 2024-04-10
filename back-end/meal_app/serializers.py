from rest_framework import serializers
from meal_app.models import Meal
from food_app.serializers import FoodSerializer


class MealSerializer(serializers.ModelSerializer):
    food = FoodSerializer(many=True, read_only=True)

    class Meta:
        model = Meal
        fields = ['id', 'meal_date_time', 'user', 'food']
