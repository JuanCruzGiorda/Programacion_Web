# hamburgueseria/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),  # Ruta de admin
    path('api/', include('menu.urls')),  # URLs de la API
    # Redirección solo cuando se accede a la raíz exacta
    path('', RedirectView.as_view(url='/api/hamburguesas/', permanent=True)),  
]

# Configuración para archivos multimedia en modo DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
