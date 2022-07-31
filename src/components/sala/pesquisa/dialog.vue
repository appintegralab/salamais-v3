<template>
    <q-dialog v-model="dialog" persistent transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-white w-[600px]">
            <q-toolbar class="flex justify-between bg-purple-900 text-white">
                <div class="fw-600">
                    Questionário de avaliação
                </div>
                <q-btn dense round size="sm" icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-toolbar>
            <splash v-if="step == 'splash'" @cancel="dialog = false" @responder="step = '1'" />
            <theend v-if="step == 'end'" @cancel="dialog = false" />
            <div v-if="step != 'splash' && step != 'end'" class="mt-2 pt-1 px-2">
                <stepper :total="5" :step="parseInt(step)" />
            </div>
            <pergunta v-if="step == '1'" @prev="step = 'splash'" @next="step = '2'" :pergunta="perguntas[0]" />
            <pergunta v-if="step == '2'" @prev="step = '1'" @next="step = '3'" :pergunta="perguntas[1]" />
            <pergunta v-if="step == '3'" @prev="step = '2'" @next="step = '4'" :pergunta="perguntas[2]" />
            <pergunta v-if="step == '4'" @prev="step = '3'" @next="step = '5'" :pergunta="perguntas[3]" />
            <pergunta v-if="step == '5'" @prev="step = '4'" @next="step = 'end'" :pergunta="perguntas[4]" :end="true" />
        </div>
    </q-dialog>
</template>

<script>
import splash from './splash.vue'
import pergunta from "./pergunta.vue"
import stepper from "./stepper.vue"
import theend from "./the-end.vue"

export default {
    components: { splash, pergunta, stepper, theend },
    data() {
        return {
            dialog: false,
            step: 'splash',
            perguntas: [
                {
                    type: "likert",
                    question: "A temática é relevante para a organização do trabalho pedagógico na UC, com vistas à construção do desempenho final (A3)?"
                },
                {
                    type: "likert",
                    question: "A metodologia utilizada na oficina trouxe clareza para entender a relação entre o desenvolvimento de competências, o método de projeto e a construção da A3?",
                },
                {
                    type: "likert",
                    question: "O material disponibilizado para apoio à oficina contribui para ampliar os conhecimentos sobre o tema e auxiliar o professor em sua prática pedagógica?",
                },
                {
                    type: "likert",
                    question: "Os facilitadores (as) conduziram as atividades com clareza e eficiência?",
                },
                {
                    type: "open",
                    question: "Gostaria de deixar algum comentário / sugestão?",
                },
            ]
        }
    },
    mounted() {

    },
    methods: {

        show() {
            this.step = 'splash'
            this.dialog = true
        }
    },
}
</script>
