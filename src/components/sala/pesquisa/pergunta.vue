<template>
    <div>
        <div class="m-2 p-2">
            <div class="border rounded p-2 text-base fraleway">
                {{pergunta}}
            </div>
            <div class="text-xs mt-2 font-light text-gray-600">
                Avalie numa escala de zero a cinco, de acordo com seu nível de discordância/concordância.
            </div>
            <div class="m-4 p-2">
                <q-slider class="text-xs" v-model="resp" :marker-labels="arrayMarkerLabel" :min="0" :max="5" />
            </div>
            <hr class="mb-2">
            <div class="flex items-center justify-center">
                <q-btn size="sm" @click="$emit('prev')">
                    voltar
                </q-btn>
                <q-btn size="sm" class="ml-4" color="purple-9" @click="$emit('next')">
                    próximo
                </q-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        pergunta: { default: "", type: String }
    },
    data() {
        return {
            resp: 3,
            arrayMarkerLabel: [
                { value: 0, label: 'Discordo' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: 'Concordo' },
            ]
        }
    },
}
</script>
<style lang="">
    
</style>