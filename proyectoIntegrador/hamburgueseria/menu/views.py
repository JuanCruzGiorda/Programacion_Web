from django.shortcuts import render

# Create your views here.
# menu/views.py

from rest_framework import viewsets
from .models import Hamburguesa, Pedido
from .serializers import HamburguesaSerializer, PedidoSerializer

class HamburguesaViewSet(viewsets.ModelViewSet):
    queryset = Hamburguesa.objects.all()
    serializer_class = HamburguesaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
