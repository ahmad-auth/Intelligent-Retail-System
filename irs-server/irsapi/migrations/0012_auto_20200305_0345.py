# Generated by Django 3.0.3 on 2020-03-04 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('irsapi', '0011_auto_20200305_0342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='date_of_joining',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_time',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='store',
            name='creation_date',
            field=models.DateField(),
        ),
    ]
