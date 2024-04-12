from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.models import UserAccount
from meal_app.models import Meal
from .serializers import ReviewSerializer
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
        '''
            {
                message: 'insert text',
                meal_id: 'insert meal id'
            }
        '''
        data = request.data.copy()
        print('DATA: ', data)
        new_review_ser = ReviewSerializer(data=request.data)
        if new_review_ser.is_valid():
            user = UserAccount.objects.get(id=request.user.id)
            meal = Meal.objects.get(id=data['meal_id'])
            new_review = new_review_ser.save(
                author=user, meal=meal, datetime_of_review=datetime.now())
            return Response({"Success": "Review Created"}, status=HTTP_201_CREATED)
        else:
            return Response({"Failure": "Unable to create Review"}, status=HTTP_400_BAD_REQUEST)
