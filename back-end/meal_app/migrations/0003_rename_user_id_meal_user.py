# Generated by Django 5.0.4 on 2024-04-09 17:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meal_app', '0002_rename_date_time_meal_meal_date_time_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meal',
            old_name='user_id',
            new_name='user',
        ),
    ]
