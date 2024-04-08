from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.views import TokenReq
from food_proj.settings import env
import requests
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from openai import OpenAI
OPENAI_SECRET_KEY = env.get('OPENAI_SECRET_KEY')


class Meal_Gen(TokenReq):
    def post(self, request):
        data = request.data.copy()
        print('DATA :', data)
        calories = data['calories']
        from openai import OpenAI
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "I will provide you with a number of calories, and you will create a single meal that is approximately that total amount of calories. The purpose of this is for me to decide what to eat. The first line should say Here is a meal totaling approximately num of calories calories followed by a colon. The last statement should be Total Calories: num of calories. Each line between should just be a bulleted list of food items, the amount of that food, and their calorie amount."},
                {"role": "user", "content": f"Create a meal that has approximately {calories} calories. Please also provide a sum of the calories for the meal."}
            ]
        )
        print(completion.choices[0].message.content)
        return Response(completion.choices[0].message.content, status=HTTP_200_OK)


'''
------
NOTES
------
MARVEL_API_KEY = env.get('MARVEL_API_KEY')
MARVEL_SECRET_KEY = env.get('MARVEL_SECRET_KEY')
timestamp = str(int(time.time()))
HASH_STR = f'{timestamp}{MARVEL_SECRET_KEY}{MARVEL_API_KEY}'
MARVEL_SECRET_HASH_KEY = hashlib.md5(HASH_STR.encode()).hexdigest()



# PPRINT
pp = pprint.PrettyPrinter(indent=2, depth=2)
# Create your views here.


class Marvel(APIView):
    def get(self, request):
        search = 'comics'  # can be comics, characters, and more
        auth = OAuth1(MARVEL_API_KEY, MARVEL_SECRET_KEY)
        endpoint = f'http://gateway.marvel.com/v1/public/{search}?ts={timestamp}&apikey={MARVEL_API_KEY}&hash={MARVEL_SECRET_HASH_KEY}'
        response = requests.get(endpoint, auth=auth)
        print('\n\n\n\n\n\n', response.status_code, '\n\n\n\n\n\n\n\n\n')
        if response.status_code == 200:
            responseJSON = response.json()
        else:
            print(f"Error: {response.status_code}")
        display_arr = []
        for x in range(6):
            display_arr.append(responseJSON['data']['results'][x])
        return Response(display_arr)
'''
