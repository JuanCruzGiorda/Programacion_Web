<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m3" v-for="hamburguesa in hamburguesas" :key="hamburguesa.id">
        <div class="card">
          <div class="card-image" @click="irADetalle(hamburguesa.id)">
            <img :src="hamburguesa.imagen" class="hamburguesa-img">
          </div>
          <div class="card-content">
            <span class="card-title">{{ hamburguesa.nombre }}</span>
            <p>${{ hamburguesa.price }}</p>
          </div>
          <div class="card-action">
            <button class="btn" @click="confirmarAgregarAlPedido(hamburguesa)">Agregar al Pedido</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="confirm-modal" class="modal">
      <div class="modal-content">
        <h4>Confirmar</h4>
        <p>¿Está seguro de que desea agregar al pedido la hamburguesa {{ hamburguesaSeleccionada?.nombre }}?</p>
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
  name: "HamburguesasList",
  data() {
    return {
      hamburguesas: [],
      hamburguesaSeleccionada: null,
    };
  },
  methods: {
    async fetchHamburguesas() {
      const response = await axios.get("http://127.0.0.1:8000/api/hamburguesas/");
      this.hamburguesas = response.data.map(hamburguesa => ({
        ...hamburguesa,
        mostrarIngredientes: false
      }));
    },
    confirmarAgregarAlPedido(hamburguesa) {
      this.hamburguesaSeleccionada = hamburguesa;
      const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
      modal.open();
    },
    agregarAlPedidoConfirmado() {
      // Cerrar el modal al confirmar la adición
      const modal = M.Modal.getInstance(document.getElementById('confirm-modal'));
      modal.close();

      // Emitir el evento para agregar la hamburguesa al pedido
      this.$emit("agregar-pedido", { hamburguesa: this.hamburguesaSeleccionada, cantidad: 1 });

      // Mostrar mensaje de éxito en verde
      M.toast({ html: 'La hamburguesa ha sido agregada con éxito al pedido', classes: 'green' });

      // Limpiar la hamburguesa seleccionada
      this.hamburguesaSeleccionada = null;
    },
    irADetalle(id) {
      this.$router.push({ name: 'HamburguesaDetail', params: { id } });
    }
  },
  mounted() {
    this.fetchHamburguesas();
    M.Modal.init(document.querySelectorAll('.modal'));
  },
};
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.col.s12.m3 {
  flex: 0 0 25%;
  max-width: 25%;
  box-sizing: border-box;
  padding: 10px;
}
.card {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
}
.card-image {
  cursor: pointer;
}
.card-image img {
  width: 100%;
  height: auto;
  transition: transform 0.4s ease;
}
.card-image img:hover {
  transform: scale(1.06);
}
.card-title {
  font-size: 2.0rem;
  color: #000;
}
</style>
