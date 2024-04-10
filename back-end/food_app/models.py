from django.db import models
from meal_app.models import Meal
# Create your models here.


class Food(models.Model):
    meal = models.ForeignKey(
        Meal, on_delete=models.CASCADE, related_name='food', null=True)
    api_food_id = models.BigIntegerField()
    servings = models.IntegerField()
