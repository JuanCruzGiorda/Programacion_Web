<template>
  <div class="container">
    <button class="btn" @click="$router.go(-1)">
      <i class="material-icons">arrow_back</i> Volver
    </button>
    <div class="card">
      <div class="card-image">
        <img :src="hamburguesa.imagen" class="hamburguesa-img">
      </div>
      <div class="card-content">
        <span class="card-title">{{ hamburguesa.nombre }}</span>
        <p>{{ hamburguesa.ingredientes }}</p>
        <p>${{ hamburguesa.price }}</p>
        <div>
          <input type="number" v-model="cantidad" min="1">
          <button class="btn" @click="confirmarAgregarAlPedido">Agregar al Pedido</button>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="confirm-modal" class="modal">
      <div class="modal-content">
        <h4>Confirmar</h4>
        <p>¿Está seguro de que desea agregar al pedido la hamburguesa {{ hamburguesa.nombre }}?</p>
      </div>
      <div class="modal-footer">
        <button class="modal-close btn-flat">Cancelar</button>
        <button class="btn" @click="agregarAlPedidoConfirmado">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import M from 'materialize-css';

export default {
  name: "HamburguesaDetail",
  data() {
    return {
      hamburguesa: {},
      cantidad: 1,
    };
  },
  methods: {
    async fetchHamburguesa() {
      const response = await axios.get(`http://127.0.0.1:8000/api/hamburguesas/${this.$route.params.id}/`);
      this.hamburguesa = response.data;
    },
    confirmarAgregarAlPedido() {
      const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
      modal.open();
    },
    agregarAlPedidoConfirmado() {
      const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
      modal.close();
  // Verificamos que la hamburguesa tenga un id antes de agregarla al pedido
    if (!this.hamburguesa || !this.hamburguesa.id) {
      console.error("No se puede agregar una hamburguesa no válida al pedido:", this.hamburguesa);
      M.toast({html: 'Error al agregar la hamburguesa al pedido', classes: 'red'});
      return;
  }
  // Emitimos el evento solo si la hamburguesa es válida
  this.$emit("agregar-pedido", { hamburguesa: this.hamburguesa, cantidad: this.cantidad });
  M.toast({html: `La hamburguesa ${this.hamburguesa.nombre} fue agregada con éxito`, classes: 'green'});
}

  },
  mounted() {
    this.fetchHamburguesa();
    M.Modal.init(document.querySelectorAll('.modal'));
  },
};
</script>

<style>
.container {
  margin-top: 30px;
}
.card {
  width: 100%;
  height: 100%;
  position: relative;
}
.card-image img {
  width: 100%;
  height: auto;
  max-width: 400px; /* Ajustar el tamaño máximo de la imagen */
  margin: 0 auto; /* Centrar la imagen */
}
.card-title {
  font-size: 2.0rem;
  color: #000;
}
</style>