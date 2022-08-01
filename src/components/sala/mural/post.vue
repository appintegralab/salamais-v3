<template>
    <div class="my-1 p-1">
        <div class="flex items-center p-1">
            <div>
                <q-avatar class="" size="36px">
                    <q-img v-if="user != null" :src="user.urlFoto" />
                </q-avatar>
            </div>
            <div class="ml-2 flex-1">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="text-xs flato fw-400 leading-3" v-if="user != null">
                            {{ user.nome }}
                        </div>
                        <div class="text-xs flato font-light" v-if="user != null">
                            {{ user.email }}
                        </div>
                    </div>
                    <div class="text-xs font-light">
                        {{ moment(post.createdAt).locale('pt-br').fromNow() }}
                    </div>
                    <div v-if="isme">
                        <q-btn round size="xs" class="ml-2">
                            <span class="iconify text-base" data-icon="mdi:edit"></span>
                            <q-menu v-model="menuShow" anchor="bottom left" self="center right">
                                <div class="p-1">
                                    <div class="my-[2px] cursor-pointer hover:bg-gray-200">
                                        <div @click="menuShow = false; editar()"
                                            class="flex items-center rounded py-1 px-2">
                                            <div class="">
                                                <span class="text-[9pt]">Editar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="my-[2px] cursor-pointer hover:bg-gray-200">
                                        <div @click="menuShow = false; excluir()"
                                            class="flex items-center rounded py-1 px-2">
                                            <div class="">
                                                <span class="text-[9pt]">Excluir</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </q-menu>
                        </q-btn>
                    </div>
                </div>
                <hr class="my-1">
                <div class="border rounded py-1 px-2 text-sm fraleway font-normal">
                    {{ post.mensagem }}
                </div>
                <div class="mt-1 flex items-center justify-end">
                    <div>
                        <btnLike :postID="post.id" />
                    </div>
                </div>
            </div>
        </div>
        <div class="my-2 rounded-lg h-1 bg-gray-200"></div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notify from "@/components/utils/notify"
import { userStore } from "@/stores/user-store"
import btnLike from './btn-like.vue'

export default {
    components: { btnLike },
    props: {
        post: { default: null, type: Object },
    },
    data() {
        return {
            userStore: userStore(),
            user: null,
            menuShow: false
        }
    },
    watch: {
        post() {
            this.load()
        },
    },
    computed: {
        moment() {
            return moment
        },
        isme() {
            return this.user && this.user.id == this.userStore.user.id
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            onValue(rdbref("usuarios/" + this.post.userID), (snap) => {
                self.user = snap.val()
            })
        },

        excluir() {
            console.log("excluir",this.post);
            let params = this.$route.params.id
            console.log("params",params);
            let ret = confirm("Deseja realmente excluir o post?")
            if(ret) {
                console.log("sim");
                console.log("/postagens/"+params+"/"+this.post.id);
                set(rdbref("/postagens/"+params+"/"+this.post.id),null)
                notify.success("Post removido com sucesso!")
            }
        },

        editar() {
            console.log("editar",this.post);
            let params = this.$route.params.id
            console.log("params",params);
            let ret = prompt("Edite o texto da postagem",this.post.mensagem)
            if(ret) {
                console.log("sim",ret);
                console.log("/postagens/"+params+"/"+this.post.id+"/mensagem");
                set(rdbref("/postagens/"+params+"/"+this.post.id+"/mensagem"),ret)
                notify.success("Post editado com sucesso!")
            }
        }
    },
}
</script>
<style lang="">
    
</style>