from django.db import models
from django.contrib.auth.models import User

from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator


class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    store_key = models.IntegerField(blank=False)
    created_by = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    creation_date = models.DateField()
    store_title = models.CharField(max_length=64)
    store_location = models.CharField(max_length=128)
    store_manager = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    # store_contact_details = models.CharField(max_length=32)


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=32)
    date_of_joining = models.DateField()
    employment_status = models.BinaryField()
    hired_by = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL
    )
    designation = models.CharField(
        blank=False,
        choices=(
            ('A', 'ADMIN'),
            ('M', 'MANAGER'),
            ('C', 'CASHIER'),
        ),
        max_length=16
    )
    employee_age = models.IntegerField()
    pay_grade = models.IntegerField()


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=32)
    registration_status = models.BinaryField()
    customer_address = models.CharField(max_length=128)
    customer_contact = models.CharField(max_length=16)
    customer_gender = models.CharField(
        blank=True,
        choices=(
            ('M','MALE'),
            ('F', 'FEMALE'),
            ('O', 'OTHER'),
        ),
        max_length=8
    )


class Salepoint(models.Model):
    salepoint_id = models.AutoField(primary_key=True)
    salepoint_key = models.IntegerField(blank=False)
    salepoint_status = models.BinaryField()
    salepoint_store = models.ForeignKey(
        Store,
        null=True,
        on_delete=models.SET_NULL
    )


class ItemCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=32)
    category_discount = models.DecimalField(
        max_digits=2,
        decimal_places=2,
        # validators=[
        #     MinValueValidator(0),
        #     MaxValueValidator(1)
        # ]
    )


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_code = models.CharField(max_length=32)  # Barcode of Items
    item_title = models.CharField(max_length=64)
    item_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        # validators=[MinValueValidator(0)]
    )
    item_company = models.CharField(max_length=32)
    item_category = models.ForeignKey(
        ItemCategory,
        null=True,
        on_delete=models.SET_NULL
    )
    item_discount = models.DecimalField(
         max_digits=6,
         decimal_places=2,
        # validators=[
        #     MinValueValidator(0),
        #     MaxValueValidator(1)
        # ]
    )


class ItemBatch(models.Model):
    batch_id = models.AutoField(primary_key=True)
    batch_date = models.DateField()
    batch_expiry = models.DateField()
    batch_item = models.ForeignKey(
        Item,
        null=True,
        on_delete=models.SET_NULL
    )
    batch_quantity = models.IntegerField()
    batch_store = models.ForeignKey(
        Store,
        null=True,
        on_delete=models.SET_NULL
    )


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_time = models.DateTimeField()
    order_discount = models.DecimalField(
        max_digits=2,
        decimal_places=2,
        # validators=[
        #     MinValueValidator(0),
        #     MaxValueValidator(1)
        # ]
    )
    order_total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    order_by = models.ForeignKey(
        Customer,
        null=True,
        on_delete=models.SET_NULL
    )
    signed_by = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL
    )


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    sale_item = models.ForeignKey(
        Item,
        null=True,
        on_delete=models.SET_NULL
    )
    sale_batch = models.ForeignKey(
        ItemBatch,
        null=True,
        on_delete=models.SET_NULL
    )
    sale_quantity = models.IntegerField(validators=[MinValueValidator(0)])
    sale_discount = models.DecimalField(
        max_digits=2,
        decimal_places=2,
        # validators=[
        #     MinValueValidator(0),
        #     MaxValueValidator(1)
        # ]
    )
    sale_order = models.ForeignKey(
        Order,
        null=True,
        on_delete=models.SET_NULL
    )
