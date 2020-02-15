from django.contrib import admin
from .models import Store, Employee, Customer, Salepoint, ItemCategory, Item, ItemBatch, Sale, Order
# Register your models here.


admin.site.register(Store)
admin.site.register(Employee)
admin.site.register(Customer)
admin.site.register(Salepoint)
admin.site.register(ItemCategory)
admin.site.register(Item)
admin.site.register(ItemBatch)
admin.site.register(Sale)
admin.site.register(Order)
