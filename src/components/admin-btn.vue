<template>
    <span v-if="enabled">
        <q-btn round flat>
            <q-avatar size="26px">
                <span class="iconify text-[16pt]" data-icon="ic:twotone-settings" data-inline="false"></span>
            </q-avatar>
            <q-tooltip :delay="1200">Administração do Sala Mais</q-tooltip>
            <q-menu v-model="menuShow">
                <div class="min-w-[300px] p-2">
                    <div class="flex items-center">
                        <div class="mr-2 p-4">
                            <q-avatar size="60px" class="bg-gray-200">
                                <img class="" src="@/assets/salamais-icon.png">
                            </q-avatar>
                        </div>
                        <div class="flex-1 ellipsis pr-2">
                            <div class="finter text-[8pt] fw-700">
                                Administração do Sala Mais
                            </div>
                            <div class="border-t my-2"></div>

                            <div v-for="(item, index) in menuItems" :key="index">
                                <div v-if="item.separator == undefined" @click="menuShow = false; $router.push(item.link)"
                                    class="flex items-center p-1 hover:bg-gray-200 cursor-pointer">
                                    <div class="h-[20px] fs-12pt">
                                        <span class="iconify" :data-icon="item.icon"
                                            data-inline="false"></span>
                                    </div>
                                    <div class="text-xs ml-1 flex-1 ellipsis">
                                        {{item.label}}
                                    </div>
                                </div>
                                <div v-if="item.separator == true">
                                    <div class="border-t my-1"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </q-menu>
        </q-btn>
    </span>
</template>

<script>
import { userStore } from "../stores/user-store"

export default {
    data() {
        return {
            menuShow: false,
            userStore: userStore(),
            enabled: false,
            menuItems: [
                { label: "Formações", icon: "ic:twotone-edit-calendar", link: { path: '/admin-formacoes' } },
                { label: "Controle de Inscrições", icon: "wpf:renew-subscription", link: { path: '/admin-inscricoes' } },
                { label: "Facilitadores", icon: "mdi:school", link: { path: '/admin-facilitadores' } },
                { label: "Modelos Certificados", icon: "mdi:file-certificate-outline", link: { path: '/admin-tmpl-certificados' } },
                { separator: true  },
                { label: "Relatórios", icon: "clarity:export-outline-badged", link: { path: '/admin-relatorios' } },
                { label: "Usuários", icon: "ic:people", link: { path: '/admin-usuarios' } },
                { separator: true  },
                { label: "Testar envio email", icon: "ic:mail", link: { path: '/admin-mail-test' } },
            ]
        }
    },
    computed: {
        user() {
            return this.userStore.user
        }
    },
    watch: {
        'userStore.user': function (newValue) {
            //console.log("watch store", this.userStore.user);
            this.checkEnabled()
            this.$forceUpdate();
        }
    },
    mounted() {
        //console.log("userbtn mounted");
    },
    methods: {
        checkEnabled() {
            let cpf = this.userStore.user.cpf
            //console.log(cpf);
            let lista = ["18374109840", "28854077860", "99271176804", "12345678900", "36126741889"]
            if (lista.lastIndexOf(cpf) != -1) {
                this.enabled = true
            } else {
                this.enabled = false
            }
        }
    }
}
</script>

<style>
</style>