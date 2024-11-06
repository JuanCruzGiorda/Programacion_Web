from django.db import models

class Hamburguesa(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='imagenes/')
    ingredientes = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio', default=0.00)
    def __str__(self):
        return self.nombre, self.price

class Pedido(models.Model):
    hamburguesa = models.ForeignKey(Hamburguesa, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    confirmado = models.BooleanField(default=False)
