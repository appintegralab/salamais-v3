<template>
    <div class="border rounded">
        <div v-if="!loading">
            <div class="px-2 mt-1">
                <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                    <q-tab name="geral" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                        <span class="text-[10pt]">Geral</span>
                    </q-tab>
                    <q-tab name="formacoes" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                        <span class="text-[10pt]">Formações</span>
                    </q-tab>
                </q-tabs>
            </div>
            <div>
                <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                    transition-next="jump-up">
                    <q-tab-panel name="geral">
                        <geral />
                    </q-tab-panel>
                    <q-tab-panel name="formacoes">
                        <porformacao />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { presencasStore } from "@/stores/presencas-store"
import { pesquisasStore } from "@/stores/pesquisas-store"

export default {
    components: {
        "geral": defineAsyncComponent({ loader: () => import('./geral.vue') }),
        "porformacao": defineAsyncComponent({ loader: () => import('./porformacao.vue') }),
    },
    data() {
        return {
            tab: "geral",
            loading: false,
            presencasStore: presencasStore(),
            pesquisasStore: pesquisasStore()
        }
    },
    mounted() {
        let self = this
        this.loading = true
        self.presencasStore.init(() => {
            self.pesquisasStore.init(() => {
                self.loading = false
            })
        })
    },
}
</script>
<style lang="">
    
</style>