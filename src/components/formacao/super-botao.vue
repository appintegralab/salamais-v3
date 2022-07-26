<template>
    <span class="p-1">
        <button @click="$emit('onclick')" v-if="!select" :style="colorUSel"
            class="border-2 shadow-md px-3 py-2 rounded-lg flex items-center">
            <div class="pr-2">
                <span class="iconify text-2xl" :data-icon="options.icon"></span>
            </div>
            <div class="text-left">
                <p class="leading-3 text-[7pt]">
                    {{ options.subTitle }}
                </p>
                <p class="leading-3 text-xs font-semibold">
                    {{ options.title }}
                </p>
            </div>
        </button>
        <button @click="$emit('onclick')" v-if="select" :style="colorSel"
            class="border-2 shadow-md px-3 py-2 rounded-lg flex items-center">
            <div class="pr-2">
                <span class="iconify text-2xl" :data-icon="options.icon"></span>
            </div>
            <div class="text-left">
                <p class="leading-3 text-[7pt]">
                    {{ options.subTitle }}
                </p>
                <p class="leading-3 text-xs font-semibold">
                    {{ options.title }}
                </p>
            </div>
        </button>
    </span>
</template>

<script>
export default {
    props: {
        options: { default: {}, type: Object },
        selected: { default: false, type: Boolean },
        color: { default: "#cccccc", type: String }
    },
    data() {
        return {

        }
    },
    computed: {
        colorSel() {
            return `
                border-color: ${this.options.color};
                color: ${this.options.color}; 
                background-color: white;
            `
        },
        colorUSel() {
            return `
                border-color: white;
                background-color: white;
                color: ${this.options.color}; 
                
            `
        },
        select() {
            return this.options.selected
        }
    },
    mounted() {

    },
    methods: {
        tone(col, amt) {
            let usePound = false;
            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }
            let num = parseInt(col, 16);
            let r = (num >> 16) + amt;
            if (r > 255) r = 255; else if (r < 0) r = 0;
            let b = ((num >> 8) & 0x00FF) + amt;
            if (b > 255) b = 255; else if (b < 0) b = 0;
            let g = (num & 0x0000FF) + amt;
            if (g > 255) g = 255; else if (g < 0) g = 0;
            return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        }
    },
}
</script>
<style lang="">
    
</style>