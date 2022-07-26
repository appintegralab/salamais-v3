import { createWebHistory, createRouter } from 'vue-router';
import { defineAsyncComponent } from "vue";

const routes = [
    { path: '/', component: () => import("@/components/home/home.vue") },
    { path: '/formacoes', component: () => import("@/components/formacao/formacao.vue") },
    { path: '/inscricoes', component: () => import("@/components//minhas-formacoes/minhas-formacoes.vue") },
    { path: '/concluidas', component: () => import("@/components/concluidas/concluidas.vue") },
    { path: '/formacao/:id', component: () => import("@/components/formacao/formacao.vue") },
    { path: '/profile/:id', component: () => import("@/components/profile/profile.vue") },
    { path: '/admin-formacoes', component: () => import("@/components/admin/formacoes/formacoes.vue") },
    { path: '/admin-usuarios', component: () => import("@/components/admin/users/users.vue") },
    { path: '/admin-inscricoes', component: () => import("@/components/admin/inscricoes/inscricoes.vue") },
    { path: '/admin-mail-test', component: () => import("@/components/admin/mail-test.vue") },
    { path: '/admin-facilitadores', component: () => import("@/components/admin/facilitadores/facilitadores.vue") },
    { path: '/admin-relatorios', component: () => import("@/components/admin/relatorios/relatorios.vue") },
    { path: '/facilitador', component: () => import("@/components/facilitador/facilitador.vue") },
    { path: '/sala/:id', component: () => import("@/components/sala/sala.vue") },
    { path: '/admin-tmpl-certificados', component: () => import("@/components/admin/tmpl-certificados/tmpl-certificados.vue") },
    { path: '/form-teste', component: () => import("@/components/admin/tmpl-certificados/form-teste.vue") },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router