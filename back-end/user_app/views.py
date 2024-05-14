from django.contrib.auth import authenticate
from django.db import IntegrityError
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
    HTTP_400_BAD_REQUEST,
    HTTP_500_INTERNAL_SERVER_ERROR
)
from rest_framework.authtoken.models import Token
# Create your views here.


class Signup(APIView):
    def post(self, request):
        data = request.data.copy()
        email = data.get('email')
        data['username'] = email  # Assuming email is the username field
        try:
            user = UserAccount.objects.create_user(**data)
            user.full_clean()
            user.set_password(data.get('password'))
            user.save()
            login(request, user)
            token = Token.objects.create(user=user)
            return Response(
                {'Email': user.email, 'Display Name': user.display_name, 'Token': token.key}, status=HTTP_201_CREATED
            )
        except IntegrityError as error:
            print("IntegrityError:", str(error))
            if 'unique constraint' in str(error):
                messageArr = []
                if 'username' in str(error):
                    message = "A user with that email already exists."
                    messageArr.append(message)
                    print(message)
                if 'display_name' in str(error):
                    message = "A user with that display name already exists."
                    messageArr.append(message)
                    print(message)
                return Response({'message': messageArr}, status=HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': "An integrity error occurred."}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Exception:", e)
            return Response({'message': "An error occurred during signup."}, status=HTTP_500_INTERNAL_SERVER_ERROR)


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
