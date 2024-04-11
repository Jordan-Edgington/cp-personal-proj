from django.db import models
from django.utils import timezone
from user_app.models import UserAccount
# Create your models here.


class Meal(models.Model):
    meal_date_time = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='meal', null=True)
