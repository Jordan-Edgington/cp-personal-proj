from django.contrib.auth import authenticate
from .models import UserAccount
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.hashers import check_password
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.authtoken.models import Token
# Create your views here.


class Signup(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('email')
        user = UserAccount.objects.create_user(**data)
        try:
            user.full_clean()
            user.set_password(data.get('password'))
            user.save()
            login(request, user)
            token = Token.objects.create(user=user)
            return Response(
                {'Email': user.email, 'Display Name': user.display_name, 'Token': token.key}, status=HTTP_201_CREATED
            )
        except ValidationError as error:
            print(error)
            return Response(error, status=HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        data = request.data.copy()
        print(data)
        user = authenticate(username=data.get('email'),
                            password=data.get('password'))
        print('user:', user)
        if user:
            login(request, user)
            token = Token.objects.get_or_create(user=user)
            print('token:', token[0].key)
            return Response(
                {'Email': user.email, 'Display Name': user.display_name, 'Token': token[0].key}, status=HTTP_200_OK
            )
        else:
            print('failed')
            return Response(
                {'message': 'No user matching credentials'}, status=HTTP_400_BAD_REQUEST
            )


class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Logout(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)


class Info(TokenReq):
    def get(self, request):
        return Response(
            {'email': request.user.email, 'display_name': request.user.display_name}, status=HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        # require user to confirm old password, and input new password
        if data['new_password'] and check_password(data['old_password'], request.user.password):
            request.user.set_password(data['new_password'])
            request.user.save()
            return Response({'Success': 'Password updated.'}, status=HTTP_200_OK)
        elif data['old_password'] != request.user.password:
            print(request.user.password)
            return Response({'Failed': 'Password confirmation did not match existing password'}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({'Failed': 'You must input a new password'}, status=HTTP_400_BAD_REQUEST)


class User_Info(TokenReq):
    def get(self, request, user_id):
        user = UserAccount.objects.get(id=user_id)
        return Response({'display_name': user.display_name}, status=HTTP_200_OK)
