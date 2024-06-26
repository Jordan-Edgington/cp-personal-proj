# Generated by Django 5.0.4 on 2024-04-09 17:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food_app', '0001_initial'),
        ('meal_app', '0001_initial'),
        ('review_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meal',
            old_name='date_time',
            new_name='meal_date_time',
        ),
        migrations.AlterField(
            model_name='meal',
            name='food_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='meal', to='food_app.food'),
        ),
        migrations.AlterField(
            model_name='meal',
            name='review_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='meal', to='review_app.review'),
        ),
    ]
