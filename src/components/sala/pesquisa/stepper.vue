<template>
    <div class="m-2 p-2 px-2 border rounded">
        <div class="flex items-center">
            <div v-for="(item, index) in stepsVet" :key="index" :class="item.cls">
                <span v-if="item.type=='bullet' && item.value <= step" class="rounded-lg py-0.5 px-1.5 bg-purple-600 text-white font-medium text-xs">
                    {{item.value}}
                </span>
                <span v-if="item.type=='bullet' && item.value > step" class="rounded-lg py-0.5 px-1.5 bg-purple-100 text-purple-400 font-medium text-xs">
                    {{item.value}}
                </span>
                <div v-if="item.type=='line' && item.value < step" class="border h-1 bg-purple-600"></div>
                <div v-if="item.type=='line' && item.value >= step" class="border h-1 bg-purple-100"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        total: { default: 2, type: Number },
        step: { default: 0, type: Number },
    },
    data() {
        return {
            stepsVet: []
        }
    },
    mounted() {
        this.load()
    },
    watch: {
        total() {
            this.load()
        }
    },
    methods: {

        load() {
            this.stepsVet = []
            for (let i = 0; i < this.total; i++) {
                this.stepsVet.push({
                    type: "bullet",
                    value: i + 1,
                    cls: ""
                })
                if (i < this.total - 1) {
                    this.stepsVet.push({
                        type: "line",
                        value: i + 1,
                        cls: "flex-1"
                    })
                }
            }
            console.log("this.stepsVet", this.stepsVet);
        }
    },
}
</script>
<style lang="">
    
</style>