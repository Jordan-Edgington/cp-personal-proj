# Generated by Django 5.0.4 on 2024-04-09 17:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('food_app', '0001_initial'),
        ('review_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('food_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal', to='food_app.food')),
                ('review_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal', to='review_app.review')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
