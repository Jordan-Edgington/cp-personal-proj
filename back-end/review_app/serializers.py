from rest_framework import serializers
from review_app.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    # subtasks = Subtask_Serializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
