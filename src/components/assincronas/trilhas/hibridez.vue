<template>
    <div class="p-3 h-[260px] bg-gradient-to-r from-black/80 to-black/40 rounded-lg -ml-4 -mt-4 -mr-4">
        <div class="grid grid-cols-10">
            <div class="col-span-4">
                <div class="flex items-center">
                    <span class="iconify text-fuchsia-700 text-[38pt]" data-icon="ph:chalkboard-teacher-duotone"></span>
                    <span class="ml-1 text-white fpoppins text-2xl font-semibold">
                        {{ trilhasInfo.nome }}
                    </span>
                </div>
                <div class="-mt-1 pr-3 text-right text-white fpoppins font-semibold">
                    <span class="px-1 rounded bg-fuchsia-900 text-white hover:bg-fuchsia-800 cursor-pointer">
                        Realizar trilha
                    </span>
                </div>
                <div v-if="$q.screen.gt.sm" class="my-2 text-center text-white font-light text-xs fpoppins">
                    {{ trilhasInfo.sinopse }}
                </div>
                <div class="grid grid-cols-2 mt-4">
                    <div class="text-white text-center" v-for="(curador, index) in trilhasInfo.curadores" ::key="index">
                        <div>
                            <q-avatar class="w-[26px] h-[26px] sm:w-[42px] sm:h-[42px] md:w-[56px] md:h-[56px]">
                                <q-img :src="curador.urlFoto" />
                            </q-avatar>
                        </div>
                        <div class="text-xs mt-1">
                            {{ curador.nome }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-6 p-6 text-center ">
                <div class="fpoppins text-base md:text-2xl font-semibold text-white"
                    v-for="(item, index) in trilhasInfo.chamadas" :key="index">
                    <div :ref="'chamada' + index" class="absolute opacity-0 bg-gray-900/30 rounded-lg mx-16 p-2">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import trilhasInfo from '../trilhas-info'
import anime from 'animejs/lib/anime.es.js';

export default {
    data() {
        return {
            trilhasInfo: trilhasInfo["educacao-hibrida"],
            frame: 0,
        }
    },
    mounted() {

        const t1 = anime.timeline({
            easing: 'easeOutExpo',
            autoplay: false,
            loop: true
        });

        for (let i in this.trilhasInfo.chamadas) {
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
    methods: {

        animaChamada() {
            let self = this


            if (this.frame == this.trilhasInfo.chamadas.length - 1) {
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