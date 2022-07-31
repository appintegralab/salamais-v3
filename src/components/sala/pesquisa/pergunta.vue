<template>
    <div>
        <div class="m-2 p-2">
            <div class="border rounded shadow-md p-4 px-4 text-[13pt] font-semibold text-justify fnunito">
                {{ pergunta.question }}
            </div>
            <div v-if="pergunta.type == 'likert'">
                <div class="text-sm mt-3 font-light text-gray-600 text-center">
                    Avalie numa escala de zero a cinco, de acordo com seu nível de discordância/concordância.
                </div>
                <div class="m-4 p-2">
                    <q-slider class="text-xs" v-model="resp" :marker-labels="arrayMarkerLabel" :min="0" :max="5" />
                </div>
            </div>
            <div v-if="pergunta.type == 'open'">
                <div class="text-sm mt-3 font-light text-gray-600 text-center">
                    Escreva seu comentário / sugestão
                </div>
                <div class="m-1 p-2">
                    <textarea class="w-full border rounded p-1" name="" id="" rows="4" placeholder="Digite seu comentário"></textarea>
                </div>
            </div>
            <hr class="mb-2">
            <div class="flex items-center justify-center">
                <q-btn size="sm" @click="$emit('prev')">
                    voltar
                </q-btn>
                <q-btn v-if="!end" size="sm" class="ml-4" color="purple-9" @click="$emit('next')">
                    próximo
                </q-btn>
                <q-btn v-if="end" size="sm" class="ml-4" color="purple-9" @click="$emit('next')">
                    concluir avaliação
                </q-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        pergunta: { default: null, type: Object },
        end: { default: false, type: Boolean }
    },
    data() {
        return {
            resp: 0,
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