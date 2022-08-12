<template>
    <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-gray-100 text-white">
            <div class="absolute w-full">
                <q-bar class="bg-fuchsia-900">
                    <span class="fpoppins font-medium text-sm">
                        {{trilha.nome}}
                    </span>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
                    </q-btn>
                </q-bar>
            </div>
            <div class="absolute text-black mt-8 pb-10 border rounded w-screen h-full">
                <div class="flex h-full">
                    <iframe class="w-full h-full" :src="trilha.link" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </q-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            trilha: null
        }
    },
    mounted() {

    },
    methods: {

        show(trilha) {
            if (trilha) {
                this.trilha = trilha
                console.log(this.trilha);
                this.dialog = true
            }
        }
    },
}
</script>
<style lang="">
    
</style>