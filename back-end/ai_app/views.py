from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.views import TokenReq, HttpOnlyReq
from food_proj.settings import env
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_500_INTERNAL_SERVER_ERROR
)
from openai import OpenAI
OPENAI_SECRET_KEY = env.get('OPENAI_SECRET_KEY')


class Meal_Gen(HttpOnlyReq):
    def post(self, request):
        try:
            data = request.data.copy()
            print('DATA :', data)
            calories = data['calories']
            from openai import OpenAI
            print('test1')
            client = OpenAI(api_key=OPENAI_SECRET_KEY)
            print('test2')
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "I will provide you with a number of calories, and you will create a single meal that is approximately that total amount of calories. The purpose of this is for me to decide what to eat. The first line should say Here is a meal totaling approximately num of calories calories followed by a colon. The last statement should be Total Calories: num of calories. Each line between should just be a bulleted list of food items, the amount of that food, and their calorie amount."},
                    {"role": "user", "content": f"Create a meal that has approximately {calories} calories. Please also provide a sum of the calories for the meal."}
                ]
            )
            print(completion.choices[0].message.content)
            return Response(completion.choices[0].message.content, status=HTTP_200_OK)
        except Exception as e:
            print(f"An error occurred: {e}")
            # You can log the error or handle it appropriately
            return Response("An error occurred", status=HTTP_500_INTERNAL_SERVER_ERROR)


class New_Meal(HttpOnlyReq):
    def post(self, request):
        pass
