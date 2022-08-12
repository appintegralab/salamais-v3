<template>
    <div class="p-3 h-[260px] bg-gradient-to-r from-black/80 to-black/10 rounded-lg -ml-4 -mt-4 -mr-4">
        <div class="grid grid-cols-10" v-if="trilha != null">
            <div class="col-span-5">
                <div class="flex items-center">
                    <span class="iconify text-fuchsia-700 text-[38pt]" data-icon="ph:chalkboard-teacher-duotone"></span>
                    <div class="flex-1 leading-5 ml-1 text-white fpoppins text-[14pt] font-bold">
                        {{ trilha.nome }}
                    </div>
                </div>
                <div class="ml-14 mt-2 mb-2 pr-3 text-left text-white fpoppins font-semibold">
                    <span @click="$emit('realizarTrilha')" class="px-1 text-xl rounded bg-fuchsia-900 text-white hover:bg-fuchsia-800 cursor-pointer">
                        Realizar trilha
                    </span>
                </div>
                <div v-if="$q.screen.gt.sm" class="my-2 ml-8 text-center text-white font-light text-xs fpoppins">
                    {{ trilha.sinopse }}
                </div>
                <div class="grid grid-cols-3 justify-start mt-3">
                    <div class="text-white text-center px-2" v-for="(curador, index) in trilha.curadores" ::key="index">
                        <div>
                            <q-avatar class="w-[26px] h-[26px] sm:w-[42px] sm:h-[42px] md:w-[46px] md:h-[46px]">
                                <q-img :src="curador.urlFoto" />
                            </q-avatar>
                        </div>
                        <div class="text-xs font-light mt-1 leading-4 truncate">
                            {{ curador.nome }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-5 p-6 text-center ">
                <div class="fpoppins text-base md:text-2xl font-semibold text-white"
                    v-for="(item, index) in trilha.chamadas" :key="index">
                    <div :ref="'chamada' + index" class="absolute opacity-0 bg-gray-900/30 rounded-lg mx-16 p-2">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
    props: {
        trilha: { default: null, type: Object }
    },
    data() {
        return {
            frame: 0,
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            if(this.trilha == null) return

            const t1 = anime.timeline({
                easing: 'easeOutExpo',
                autoplay: false,
                loop: true
            });

            for (let i in this.trilha.chamadas) {
                let elem = this.$refs['chamada' + i]
                console.log(elem);
                t1.add({
                    targets: elem,
                    scale: 0.01,
                    duration: 10
                })
                t1.add({
                    targets: elem,
                    opacity: 1,
                    rotateX: 360,
                    scale: 1,
                    duration: 3000
                }).add({
                    targets: elem,
                    opacity: 1,
                    duration: 3000
                }).add({
                    targets: elem,
                    opacity: 0,
                    duration: 500
                }).add({
                    targets: elem,
                    opacity: 0,
                    duration: 500
                })
            }
            t1.play()

        },

        animaChamada() {
            let self = this


            if (this.frame == this.trilha.chamadas.length - 1) {
                this.frame = 0
            } else {
                this.frame++
            }
            setInterval(() => {
                console.log(self.frame);
                self.animation.play();
                self.animaChamada()
            }, 1000)
        }
    },
}
</script>
<style lang="">
    
</style>