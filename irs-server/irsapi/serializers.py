from rest_framework import serializers
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from .models import Store, Employee, Customer, Salepoint, ItemCategory, Item, ItemBatch, Order, Sale


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password'
        )
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = (
            'store_id',
            'store_key',
            'created_by',
            'creation_date',
            'store_title',
            'store_location',
            'store_manager'
        )


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            'employee_id',
            'employee_name',
            'date_of_joining',
            'employment_status',
            'hired_by',
            'designation',
            'employee_age',
            'pay_grade'
        )


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'customer_id',
            'customer_name',
            'registration_status',
            'customer_address',
            'customer_contact',
            'customer_gender',
        )


class SalepointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salepoint
        fields = (
            'salepoint_id',
            'salepoint_name',
            'salepoint_status',
            'salepoint_store'
        )


class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = (
            'category_id',
            'category_name',
            'category_discount'
        )


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        depth = 1
        fields = (
            'item_id',
            'item_code',
            'item_title',
            'item_price',
            'item_company',
            'item_category',
            'item_discount',
        )
        # def create(self, validated_data):
        #     # Override default `.create()` method in order to properly add `sport` and `category` into the model
        #     category = validated_data.pop('item_category')
        #     item = Item.objects.create(item_category=category, **validated_data)
        #     return item

class ItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'item_id',
            'item_code',
            'item_title',
            'item_price',
            'item_company',
            'item_category',
            'item_discount',
        )


class ItemBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemBatch
        fields = (
            'batch_id',
            'batch_date',
            'batch_expiry',
            'batch_item',
            'batch_quantity',
            'batch_store'
        )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'order_id',
            'order_time',
            'order_discount',
            'order_total',
            'order_by',
            'signed_by'
        )


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = (
            'sale_id',
            'sale_item',
            'sale_batch',
            'sale_quantity',
            'sale_discount',
            'sale_order'
        )


