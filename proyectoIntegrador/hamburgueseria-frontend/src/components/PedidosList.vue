<template>
  <div class="container">
    <div class="pedido-header">
      <a class="back-button" @click="irAPaginaPrincipal">
        <span class="material-icons">arrow_back</span>
      </a>
      <h4 class="center-align">Mi Pedido</h4>
    </div>
    <div class="row justify-content-center">
      <div class="col s12 m8 offset-m2">
        <ul class="collection">
          <li v-for="pedido in pedidos" :key="pedido.hamburguesa?.id" class="collection-item avatar">
            <img v-if="pedido.hamburguesa?.imagen" :src="pedido.hamburguesa.imagen" alt="" class="circle">
            <div class="pedido-info">
              <span class="title">{{ pedido.hamburguesa?.nombre }}</span>
              <p>
                Cantidad: <input type="number" v-model="pedido.cantidad" min="1" @change="actualizarCantidad(pedido)">
                <br>
                Precio total: ${{ pedido.hamburguesa ? (pedido.hamburguesa.price * pedido.cantidad).toFixed(2) : '' }}
              </p>
            </div>
            <button class="btn red secondary-content" @click="confirmarEliminar(pedido.hamburguesa?.id)">Eliminar</button>
          </li>
        </ul>
        <div class="total-pedido">
          <h5>Total del Pedido: ${{ totalPedido.toFixed(2) }}</h5>
        </div>
        <button class="btn green" @click="confirmarPedido">Confirmar Pedido</button>
      </div>
    </div>

    <!-- Modal Structure for Deletion -->
    <div id="confirm-modal" class="modal">
      <div class="modal-content">
        <h4>Confirmar</h4>
        <p>¿Está seguro de que desea eliminar la hamburguesa del pedido?</p>
      </div>
      <div class="modal-footer">
        <button class="modal-close btn-flat">Cancelar</button>
        <button class="btn red" @click="eliminarAlPedidoConfirmado">Eliminar</button>
      </div>
    </div>

    <!-- Modal Structure for Confirming Order -->
    <div id="confirm-order-modal" class="modal">
      <div class="modal-content">
        <h4>Confirmar Pedido</h4>
        <p>¿Está seguro de que desea confirmar el pedido?</p>
      </div>
      <div class="modal-footer">
        <button class="modal-close btn-flat">Cancelar</button>
        <button class="btn green" @click="confirmarPedidoConfirmado">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';

export default {
  name: "PedidosList",
  props: ["pedidos"],
  data() {
    return {
      hamburguesaAEliminar: null,
    };
  },
  computed: {
    totalPedido() {
      return this.pedidos.reduce((total, pedido) => total + (pedido.hamburguesa ? pedido.hamburguesa.price * pedido.cantidad : 0), 0);
    }
  },
  methods: {
    irAPaginaPrincipal() {
      this.$router.push({ name: 'Inicio' });
    },
    confirmarEliminar(id) {
      if (id) {
        this.hamburguesaAEliminar = id;
        const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
        modal.open();
      }
    },
    eliminarAlPedidoConfirmado() {
      const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
      modal.close();

      if (this.hamburguesaAEliminar !== null) {
        this.eliminarDelPedido(this.hamburguesaAEliminar);
        M.toast({ html: 'La hamburguesa ha sido eliminada con éxito', classes: 'green' });
        this.hamburguesaAEliminar = null;
      }
    },
    eliminarDelPedido(id) {
      if (id) {
        this.$emit("eliminar-pedido", id);
      }
    },
    confirmarPedido() {
      const modal = M.Modal.getInstance(document.getElementById('confirm-order-modal'));
      modal.open();
    },
    confirmarPedidoConfirmado() {
      const modal = M.Modal.getInstance(document.getElementById('confirm-order-modal'));
      modal.close();
      const mensaje = `¡Hola! Te paso el resumen de mi pedido\n\nPedido:\n${this.pedidos
        .map((p) => `- ${p.hamburguesa?.nombre} x ${p.cantidad}`)
        .join("\n")}\n\nMonto total: $${this.totalPedido.toFixed(2)}`;
      const url = `https://wa.me/5493564691298?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
      M.toast({ html: 'El pedido ha sido confirmado con éxito', classes: 'green' });
    },
    actualizarCantidad(pedido) {
      if (pedido.hamburguesa && pedido.hamburguesa.id) {
        this.$emit("actualizar-pedido", pedido);
      }
    },
  },
  mounted() {
    M.Modal.init(document.querySelectorAll('.modal'));
  },
};
</script>

<style>
.pedido-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.pedido-header {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.back-button {
  font-size: 24px;
  margin-right: 10px;
  text-decoration: none;
  color: black;
}

.back-button:hover {
  cursor: pointer;
}

.pedido-list {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.pedido-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.pedido-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 10px;
}

.pedido-info {
  flex-grow: 1;
}

.pedido-title {
  font-weight: bold;
}

.pedido-qty-price {
  display: flex;
  align-items: center;
}

.qty-btn {
  font-size: 20px;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.pedido-price {
  font-weight: bold;
  color: #ff6600;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ff0000;
}

.pedido-footer {
  margin-top: 20px;
  text-align: center;
}

.pedido-total {
  font-size: 18px;
  margin-bottom: 10px;
}

.confirm-btn {
  width: 100%;
  padding: 10px;
  background-color: #87cefa;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #00bfff;
}
</style>