<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Hamburguesería</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/pedidos">Pedidos</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view :pedidos="pedidosFiltrados" @agregar-pedido="agregarAlPedido" @eliminar-pedido="eliminarDelPedido" @actualizar-pedido="actualizarPedido"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pedidos: JSON.parse(localStorage.getItem('pedidos')) || []
    };
  },
  computed: {
    pedidosFiltrados() {
      return this.pedidos.filter(p => p.hamburguesa && p.hamburguesa.id);
    }
  },
  methods: {
    agregarAlPedido({ hamburguesa, cantidad }) {
      if (!hamburguesa || !hamburguesa.id) return;
      const pedidoExistente = this.pedidos.find(p => p.hamburguesa && p.hamburguesa.id === hamburguesa.id);
      if (pedidoExistente) {
        pedidoExistente.cantidad += cantidad;
      } else {
        this.pedidos.push({ hamburguesa, cantidad });
      }
      this.guardarPedidos();
    },
    eliminarDelPedido(id) {
      if (!id) return;
      this.pedidos = this.pedidos.filter(p => p.hamburguesa && p.hamburguesa.id !== id);
      this.guardarPedidos();
    },
    actualizarPedido(pedidoActualizado) {
      if (!pedidoActualizado || !pedidoActualizado.hamburguesa || !pedidoActualizado.hamburguesa.id) return;
      const pedidoExistente = this.pedidos.find(p => p.hamburguesa && p.hamburguesa.id === pedidoActualizado.hamburguesa.id);
      if (pedidoExistente) {
        pedidoExistente.cantidad = pedidoActualizado.cantidad;
      }
      this.guardarPedidos();
    },
    guardarPedidos() {
      localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
    }
  }
};
</script>

<style>
.nav-wrapper {
  background-color: #c22d00;
}
.brand-logo {
  padding-left: 20px;
}
</style>
