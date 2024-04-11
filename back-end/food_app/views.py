from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.views import TokenReq
from food_proj.settings import env
from .models import Food
import requests
from requests_oauth2client import *
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)


class FatSecretFoodByID(TokenReq):
    def post(self, request, id):
        token_url = 'https://oauth.fatsecret.com/connect/token'
        client_id = env.get('FATSECRET_CLIENT_ID')
        client_secret = env.get('FATSECRET_CLIENT_SECRET')
        api_endpoint = 'https://platform.fatsecret.com/rest/server.api'

        oauth2client = OAuth2Client(
            token_url, (client_id, client_secret)
        )
        api = ApiClient(
            api_endpoint, auth=OAuth2ClientCredentialsAuth(oauth2client)
        )

        # will actually send a POST to https://myapi.local/root/resource/foo
        resp = api.post(
            f"?method=food.get.v4&food_id={id}&format=json")
        response = resp.json()['food']
        new_response = {}
        new_response['name'] = response['food_name']
        new_response['food_id'] = response['food_id']
        new_response['serving'] = response['servings']['serving'][0]['serving_description']
        new_response['calories'] = response['servings']['serving'][0]['calories']
        print(new_response)
        return Response(new_response, status=HTTP_200_OK)


class FatSecretFoodSearch(TokenReq):
    def post(self, request, search):
        token_url = 'https://oauth.fatsecret.com/connect/token'
        client_id = env.get('FATSECRET_CLIENT_ID')
        client_secret = env.get('FATSECRET_CLIENT_SECRET')
        api_endpoint = 'https://platform.fatsecret.com/rest/server.api'

        oauth2client = OAuth2Client(
            token_url, (client_id, client_secret)
        )
        api = ApiClient(
            api_endpoint, auth=OAuth2ClientCredentialsAuth(oauth2client)
        )

        # will actually send a POST to https://myapi.local/root/resource/foo
        resp = api.post(
            f"?method=foods.search&search_expression={search}&format=json&max_results=50")
        foods = resp.json().get("foods")
        food = foods.get('food')
        new_foods_response = {"foods": []}
        counter = 0
        for food_data in food:
            if food_data.get('food_type') == 'Generic':
                counter += 1
                print(food_data)
                new_foods_response.get("foods").append({counter: {'food_description': food_data["food_description"], 'food_id': food_data.get(
                    'food_id'), 'food_name': food_data.get("food_name")}})
        print(new_foods_response)
        return Response(new_foods_response, status=HTTP_200_OK)


class AFood(TokenReq):
    def delete(self, request, food_id):
        food = get_object_or_404(Food, id=food_id)
        food.delete()
        return Response(status=HTTP_204_NO_CONTENT)
