# Generated by Django 5.0.1 on 2024-07-28 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bet', '0003_remove_bet_matchid_bet_match'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='team1Score',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='bet',
            name='team2Score',
            field=models.IntegerField(null=True),
        ),
    ]
