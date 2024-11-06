# menu/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HamburguesaViewSet, PedidoViewSet

# Configura el router y registra las rutas
router = DefaultRouter()
router.register(r'hamburguesas', HamburguesaViewSet)
router.register(r'pedidos', PedidoViewSet)

# Incluye las rutas del router en las URLs de la aplicación
urlpatterns = [
    path('', include(router.urls)),
]
