# Generated by Django 5.0.4 on 2024-04-09 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meal_app', '0005_rename_food_id_meal_food_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meal',
            name='food',
        ),
        migrations.RemoveField(
            model_name='meal',
            name='review',
        ),
    ]