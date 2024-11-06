import { createRouter, createWebHistory } from 'vue-router';
import HamburguesasList from '../components/HamburguesasList.vue';
import PedidosList from '../components/PedidosList.vue';
import HamburguesaDetail from '../components/HamburguesaDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: HamburguesasList
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: PedidosList
  },
  {
    path: '/hamburguesa/:id',
    name: 'HamburguesaDetail',
    component: HamburguesaDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;