<template>
    <div>
        <div class="m-2 p-2 border rounded">
            <banner :slide="slide" @realizarTrilha="realizarTrilha" />
        </div>
        <div class="mx-2 p-2">
            <div class="mx-2 fpoppins text-base font-medium">
                Trilhas disponíveis
            </div>
            <div class="mx-2 p-1 border">
                <vue-horizontal responsive>
                    <section v-for="(item, key, index) in trilhas" :key="index">
                        <TrilhaCard :trilha="item" @select="select(key)" />
                    </section>
                </vue-horizontal>
            </div>

            <div class="mt-2 mx-2 fpoppins text-base font-medium">
                Trilhas em andamento
            </div>
            <div class="mx-2 p-2 border">
                <vue-horizontal responsive>
                    <section v-for="(item, key, index) in trilhas" :key="index">
                        <TrilhaCard :trilha="item" @select="select(key)" />
                    </section>
                </vue-horizontal>
            </div>

            <div class="mt-2 mx-2 fpoppins text-base font-medium">
                Trilhas realizadas
            </div>
            <div class="mx-2 p-2 border">
                <vue-horizontal responsive>
                    <section v-for="(item, key, index) in trilhas" :key="index">
                        <TrilhaCard :trilha="item" @select="select(key)" />
                    </section>
                </vue-horizontal>
            </div>

        </div>
        <dialogtrilha ref="dialogtrilharef" />
    </div>
</template>

<script>
import banner from './banner.vue'
import VueHorizontal from "vue-horizontal";
import TrilhaCard from "./trilha-card.vue";
import trilhasInfo from './trilhas-info'
import dialogtrilha from "./dialog-trilha.vue"

export default {
    components: { banner, VueHorizontal, TrilhaCard, dialogtrilha },
    data() {
        return {
            trilhas: trilhasInfo,
            slide: "educacao-hibrida"
        }
    },
    mounted() {

    },
    methods: {

        select(key) {
            console.log("select", key);
            this.slide = key
        },

        realizarTrilha(trilha) {
            console.log("trilha", trilha);
            this.$refs.dialogtrilharef.show(trilha)
        }
    },
}
</script>
<style lang="">
    
</style>