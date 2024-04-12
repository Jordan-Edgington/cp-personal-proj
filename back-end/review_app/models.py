from django.db import models
from user_app.models import UserAccount
from meal_app.models import Meal
# Create your models here.


class Review(models.Model):
    author = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='review', null=True)
    datetime_of_review = models.DateTimeField(null=True)
    message = models.TextField()
    meal = models.ForeignKey(
        Meal, on_delete=models.CASCADE, related_name='review', null=True)
