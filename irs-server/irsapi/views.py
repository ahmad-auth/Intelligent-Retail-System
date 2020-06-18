from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters

from django.contrib.auth.models import User

from .models import Store, Employee, Customer, Salepoint, ItemCategory, Item, ItemBatch, Order, Sale
from .serializers import UserSerializer, StoreSerializer, EmployeeSerializer, CustomerSerializer, SalepointSerializer, ItemCategorySerializer, ItemSerializer, ItemCreateSerializer, ItemBatchSerializer, OrderSerializer, SaleSerializer
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class SalepointViewSet(viewsets.ModelViewSet):
    queryset = Salepoint.objects.all()
    serializer_class = SalepointSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class ItemCategoryViewSet(viewsets.ModelViewSet):
    queryset = ItemCategory.objects.all()
    serializer_class = ItemCategorySerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['item_title', 'item_code', 'item_company', 'item_category__category_name']
    def create(self, request, *args, **kwargs):
        # If we're creating (POST) then we switch serializers to the one that doesn't include depth = 2
        serializer = ItemCreateSerializer(data = request.data)
        if serializer.is_valid():
            self.object = serializer.save()
            headers = self.get_success_headers(serializer.data)
            # Here we serialize the object with the proper depth = 2
            new_c = ItemSerializer(self.object)
            return Response(new_c.data, status = status.HTTP_201_CREATED, headers = headers)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = ItemCreateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.is_valid(raise_exception=True)
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            # Here we serialize the object with the proper depth = 2
            new_c = ItemSerializer(instance)
            return Response(new_c.data, status = status.HTTP_201_CREATED, headers = headers)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class ItemBatchViewSet(viewsets.ModelViewSet):
    queryset = ItemBatch.objects.all()
    serializer_class = ItemBatchSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

class ForecastDataViewSet(viewsets.ViewSet):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, format=None):
        
        predictions = forecast_monthly_sales(days=200)

        return Response(predictions)