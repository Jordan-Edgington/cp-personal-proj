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

# Create your views here.


class Review(TokenReq):
    def post(self, request):
        pass
