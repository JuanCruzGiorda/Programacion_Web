# menu/serializers.py

from rest_framework import serializers
from .models import Hamburguesa, Pedido

class HamburguesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hamburguesa
        fields = ['id', 'nombre', 'imagen', 'ingredientes', 'price']

class PedidoSerializer(serializers.ModelSerializer):
    hamburguesa = HamburguesaSerializer()  # Serializador anidado para mostrar datos de la hamburguesa

    class Meta:
        model = Pedido
        fields = ['id', 'hamburguesa', 'cantidad', 'confirmado']
