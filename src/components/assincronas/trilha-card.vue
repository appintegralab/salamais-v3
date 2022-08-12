<template>
    <div class="p-0" v-if="trilha != null">
        <div :class="style" @mouseover="over" @mouseleave="leave">
            <q-img class="rounded-lg h-full" :src="trilha.urlCapaCartao" spinner-color="purple"
                spinner-size="42px" />
            <div class="absolute top-0 ml-2 mt-1">
                <span class="iconify text-fuchsia-500 text-[18pt] bg-black/50 rounded" data-icon="ph:chalkboard-teacher-duotone"></span>
            </div>
            <div class="absolute bottom-0 mx-2 mb-2">
                <div v-if="showButton" class="text-center text-white fpoppins font-semibold my-2">
                    <span class="px-1 rounded bg-fuchsia-900 text-white hover:bg-fuchsia-800 cursor-pointer">
                        Realizar trilha
                    </span>
                </div>
                <div v-if="trilha.nome.length > 65" class="text-white text-[9pt] fpoppins font-semibold p-1 bg-black/70 rounded">
                    {{trilha.nome.substr(0,65)}}...
                </div>
                <div v-if="trilha.nome.length <= 65" class="text-white text-[9pt] fpoppins font-semibold p-1 bg-black/70 rounded">
                    {{trilha.nome}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        trilha: { default: null, type: Object }
    },
    data() {
        return {
            style: `
                transform transition duration-500 hover:scale-105 hover:rounded-lg
                mr-3 border rounded-lg w-40 max-h-40 h-40
            `,
            showButton: false
        }
    },
    mounted() {

    },
    methods: {

        over() {
            console.log("over");
            this.showButton = true
            this.$emit('select')
        },

        leave() {
            console.log("leave");
            this.showButton = false
        }
    },
}
</script>
<style lang="">
    
</style>