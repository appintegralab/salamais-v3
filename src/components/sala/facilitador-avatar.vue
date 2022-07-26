<template>
    <div v-if="user != null">
        <div class="flex items-center mb-1 border p-1">
            <div class="">
                <q-avatar size="30px">
                    <q-img :src="user.urlFoto" />
                </q-avatar>
            </div>
            <div class="flex-1 ml-2 truncate">
                <div class="text-[8pt] fw-400 leading-3">
                    <router-link :to="{ path: '/profile/' + user.id }" target="_blank">
                        <span class="">{{ user.nome }}</span>
                    </router-link>
                </div>
                <div class="mt-1 text-[8pt] fw-300 flato leading-3">
                    {{ user.email }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rdb } from "@/firebase/firebase.js"
import { ref, get } from "firebase/database"

export default {
    props: {
        userID: { default: "noid", type: String }
    },
    data() {
        return {
            user: null
        }
    },
    watch: {
        userID() {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let self = this
            get(ref(rdb, "/salamais/usuarios/" + this.userID)).then((snap) => {
                let user = snap.val()
                if (user) {
                    self.user = user
                }
            })
        }
    },
}
</script>
<style lang="">
    
</style>