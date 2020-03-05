# Generated by Django 3.0.3 on 2020-03-04 22:42

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('irsapi', '0010_auto_20200305_0336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='registration_status',
            field=models.BinaryField(),
        ),
        migrations.AlterField(
            model_name='employee',
            name='date_of_joining',
            field=models.DateField(default=datetime.datetime(2020, 3, 4, 22, 42, 56, 298976, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='employee',
            name='employment_status',
            field=models.BinaryField(),
        ),
        migrations.AlterField(
            model_name='item',
            name='item_discount',
            field=models.DecimalField(decimal_places=2, max_digits=2),
        ),
        migrations.AlterField(
            model_name='item',
            name='item_price',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
        migrations.AlterField(
            model_name='itemcategory',
            name='category_discount',
            field=models.DecimalField(decimal_places=2, max_digits=2),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_discount',
            field=models.DecimalField(decimal_places=2, max_digits=2),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 3, 4, 22, 42, 56, 298976, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='sale',
            name='sale_discount',
            field=models.DecimalField(decimal_places=2, max_digits=2),
        ),
        migrations.AlterField(
            model_name='salepoint',
            name='salepoint_status',
            field=models.BinaryField(),
        ),
        migrations.AlterField(
            model_name='store',
            name='creation_date',
            field=models.DateField(default=datetime.datetime(2020, 3, 4, 22, 42, 56, 298976, tzinfo=utc)),
        ),
    ]
