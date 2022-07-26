<template>
    <div class="my-1">
        <div class="flex items-center p-1">
            <div>
                <q-avatar class="" size="30px">
                    <q-img :src="userStore.user.urlFoto" />
                </q-avatar>
            </div>
            <div class="ml-2 flex-1">
                <div class="text-xs flato fw-400">
                    {{ userStore.user.nome }}
                </div>
                <div class="text-xs flato fw-600">
                    Criar uma nova postagem
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-1 mx-2">
            <textarea v-model="mensagem" class="p-3 bg-transparent border border-gray-300 rounded" rows="3"
                placeholder="Escreva uma mensagem para todos da sala"></textarea>
            <div class="flex justify-between mt-2">
                <div>
                    <q-checkbox dense v-model="enviarEmail" color="blue-grey"/>
                    <span class="ml-2 text-xs">Enviar a mensagem para todos por email</span>
                </div>
                <q-btn @click="enviar" size="xs" class="flex items-center px-2 h-6 bg-slate-200">
                    <span class="iconify text-sm" data-icon="ic:round-send"></span>
                    <div class="ml-1 pt-[2px] fw-400 text-xs">enviar</div>
                </q-btn>
            </div>
        </div>
        <div class="bg-gray-200 h-1 mx-2 mt-3"></div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"

export default {
    data() {
        return {
            enviarEmail: false,
            userStore: userStore(),
            mensagem: "",
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    mounted() {
        
    },
    methods: {
        
        enviar() {
            let self = this
            console.log("enviar");
            if(this.mensagem.trim() == '') {
                self.$q.notify(notif.error("Texto da mensagem obrigatório!"))
                return
            }
            console.log("this.mensagem",this.mensagem);
            console.log("this.enviarEmail",this.enviarEmail);

            let item = {
                id: this.userStore.user.id + "-" + moment().format(),
                mensagem: this.mensagem,
                createdAt: moment().format(),
                userID: this.userStore.user.id,
                emailSent: this.enviarEmail
            }
            let path = "/salamais/postagens/"+this.$route.params.id+"/"+item.id
            console.log(path,item);
            set(ref(rdb,path),item)
            //console.log(item);
            self.mensagem = ""
            self.$q.notify(notif.success("Mensagem enviada com sucesso!"))
        }
    },
}
</script>
<style lang="">
    
</style>