<template>
    <div>
        <q-carousel class="max-h-[260px]" v-model="slideTab" transition-prev="slide-right" transition-next="slide-left"
            animated control-color="white" navigation arrows>
            <q-carousel-slide v-for="(trilha,key,index) in trilhas" :name="key" class="rounded-lg" :img-src="trilha.urlBanner">
                <trilhabanner :trilha="trilha" @realizarTrilha="$emit('realizarTrilha',trilha)"/>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script>
import trilhasInfo from './trilhas-info'
import trilhabanner from "./trilha-banner.vue"

export default {
    props: {
        slide: { default: "", type: String }
    },
    components: { trilhabanner },
    data() {
        return {
            slideTab: "",
            trilhas: trilhasInfo,
        }
    },
    mounted() {
        this.slideTab = this.slide
    },
    watch: {
        slide() {
            this.slideTab = this.slide
        }
    }
}
</script>
<style lang="">
    
</style>