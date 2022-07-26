<template>
    <span if="item!=null">
        <span class="px-[1px] mx-[2px] font-medium border rounded bg-yellow-200 text-orange-600">
            {{ item.label }}
        </span>
        <q-menu v-model="menuShow">
            <div @click="excluir($event,item)"
                class="flex items-center px-1 m-0.5 text-xs text-white bg-red-500 hover:bg-red-600 border rounded cursor-pointer">
                <i class="iconify inline-block" data-icon="mdi:remove-circle"></i>
                <span class="ml-1">excluir</span>
            </div>
        </q-menu>
    </span>
</template>

<script>

export default {
    props: {
        item: { default: null, type: Object }
    },
    data() {
        return {
            menuShow: false,
        }
    },
    mounted() {

    },
    methods: {

        excluir(e,item) {
            this.$emit('remove',item)
            this.menuShow = false
        }
    },
}
</script>
<style lang="">
    
</style>