# Generated by Django 3.0.3 on 2020-02-16 11:54

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('irsapi', '0003_auto_20200215_1858'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='in_stock',
        ),
        migrations.AlterField(
            model_name='employee',
            name='date_of_joining',
            field=models.DateField(default=datetime.datetime(2020, 2, 16, 11, 54, 4, 873807, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 2, 16, 11, 54, 4, 877761, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='store',
            name='creation_date',
            field=models.DateField(default=datetime.datetime(2020, 2, 16, 11, 54, 4, 872774, tzinfo=utc)),
        ),
    ]
