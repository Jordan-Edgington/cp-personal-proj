
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('user_app.urls')),
    path('api/ai/', include('ai_app.urls')),
    path('api/meals/', include('meal_app.urls')),
    path('api/foods/', include('food_app.urls')),
    path('api/reviews/', include('review_app.urls'))
]
