from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class UserAccount(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['display_name']
