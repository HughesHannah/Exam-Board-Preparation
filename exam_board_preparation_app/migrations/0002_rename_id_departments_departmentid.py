# Generated by Django 4.0.4 on 2022-07-11 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exam_board_preparation_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='departments',
            old_name='id',
            new_name='DepartmentID',
        ),
    ]