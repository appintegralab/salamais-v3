<template>
    <div v-if="elem != null">
        <div class="relative" v-if="elem.tipo == 'file'">
            <div>
                <pdfviewer :elem="elem" />
            </div>
            <div class="absolute top-0 right-0">
                <q-btn round size="xs" color="red">
                    <span class="iconify text-sm" data-icon="material-symbols:delete-outline-sharp"
                        data-inline="false"></span>
                    <q-menu v-model="removeDialog">
                        <div class="rounded w-[200px]">
                            <div class="flex p-1 bg-red-800 text-white">
                                <div class="text-[10pt] px-1">
                                    <span class="iconify" data-icon="mdi:warning"></span>
                                </div>
                                <div class="text-[8pt] fw-700">Deseja realmente excluir o item?</div>
                            </div>
                            <div class="flex justify-around p-2">
                                <q-btn @click="removeDialog = false" size="xs">cancelar
                                </q-btn>
                                <q-btn @click="$emit('excluir',elem); removeDialog = false" class="bg-red-800 text-white" size="xs">
                                    sim</q-btn>
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import pdfviewer from "./pdfviewer.vue"

export default {
    components: { pdfviewer },
    props: {
        elem: { default: null, type: Object }
    },
    data() {
        return {
            removeDialog: false
        }
    },
    mounted() {
        console.log("mateiral mounted", this.elem);
    }
}
</script>
<style lang="">
    
</style>