<template>
    <div class="flex items-center p-1" v-if="user!=null">
        <div>
            <q-avatar size="30px">
                <q-img :src="user.urlFoto" />
            </q-avatar>
        </div>
        <div class="ml-2 leading-3">
            <div>
                <span class="text-[8pt] fw-300">Nome:</span>
                <span class="text-[10pt] ml-1 fw-400">
                    {{ user.nome }}
                </span>
            </div>
            <div class="mt-1">
                <span class="text-[8pt] fw-300">Email:</span>
                <span class="text-[9pt] flato ml-1 fw-300">
                    {{ user.email }}
                </span>
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <q-btn size="6px" round @click="$emit('remove',user)">
                <span class="iconify text-[8pt]" data-icon="mdi:remove"></span>
            </q-btn>
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
            get(ref(rdb,"/salamais/usuarios/"+this.userID)).then((snap) => {
                let user = snap.val()
                if(user) {
                    self.user = user
                }
            })
        }
    },
}
</script>
<style lang="">
    
</style>