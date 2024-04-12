from rest_framework import serializers
from review_app.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    # subtasks = Subtask_Serializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class ReviewViewSerializer(serializers.ModelSerializer):
    datetime_of_review = serializers.DateTimeField(
        format="%A, %B %d, %Y %H:%M")

    class Meta:

        model = Review
        fields = '__all__'
