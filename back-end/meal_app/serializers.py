from rest_framework import serializers
from meal_app.models import Meal
from food_app.serializers import FoodSerializer


class MealSerializer(serializers.ModelSerializer):
    food = FoodSerializer(many=True, read_only=True)
    # meal_date_time = serializers.DateTimeField(format="%A, %B %d, %Y %H:%M")

    class Meta:
        model = Meal
        fields = '__all__'


class MealViewSerializer(serializers.ModelSerializer):
    food = FoodSerializer(many=True, read_only=True)
    meal_date_time = serializers.DateTimeField(format="%A, %B %d, %Y %H:%M")

    class Meta:
        model = Meal
        fields = '__all__'
