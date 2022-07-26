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
            <splash v-if="step=='splash'" @cancel="dialog=false" @responder="step='step01'"/>      
            <pergunta v-if="step=='step01'" @prev="step='splash'" @next="step='step02'" :pergunta="perguntas[0]" />      
            <pergunta v-if="step=='step02'" @prev="step='step01'" @next="step='step03'" :pergunta="perguntas[1]" />      
            <pergunta v-if="step=='step03'" @prev="step='step02'" @next="step='step04'" :pergunta="perguntas[2]" />      
            <pergunta v-if="step=='step04'" @prev="step='step03'" @next="step='step05'" :pergunta="perguntas[3]" />      
        </div>
    </q-dialog>
</template>

<script>
import splash from './splash.vue'
import pergunta from "./pergunta.vue"

export default {
    components: { splash, pergunta },
    data() {
        return {
            dialog: false,
            step: 'splash',
            perguntas: [
                "A temática é relevante para a organização do trabalho pedagógico na UC, com vistas à construção do desempenho final (A3)?",
                "A metodologia utilizada na oficina trouxe clareza para entender a relação entre o desenvolvimento de competências, o método de projeto e a construção da A3?",
                "O material disponibilizado para apoio à oficina contribui para ampliar os conhecimentos sobre o tema e auxiliar o professor em sua prática pedagógica?",
                "Os facilitadores (as) conduziram as atividades com clareza e eficiência?",
                "Gostaria de deixar algum comentário / sugestão?",
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
