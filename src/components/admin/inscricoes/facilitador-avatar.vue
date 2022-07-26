<template>
    <div v-if="user != null">
        <q-avatar size="28px">
            <q-img :src="user.urlFoto" />
        </q-avatar>
        <router-link :to="{ path: '/profile/'+user.id }" target="_blank">
            <span class="ml-[2px] text-[8pt]">{{ user.nome.split(" ")[0] }}</span>
        </router-link>
        <q-tooltip :delay="800" class="text-[7pt]">
            {{ user.nome }}
        </q-tooltip>
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