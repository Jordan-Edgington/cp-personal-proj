from rest_framework import serializers
from food_app.models import Food


class FoodSerializer(serializers.ModelSerializer):
    # subtasks = Subtask_Serializer(many=True, read_only=True)

    class Meta:
        model = Food
        fields = '__all__'
