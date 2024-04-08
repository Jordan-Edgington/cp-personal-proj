
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('user_app.urls')),
    path('api/ai/', include('ai_app.urls'))
]
