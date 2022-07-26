<template>
    <div class="" v-if="elem != null">
        <div class="flex justify-center">
            <vue-pdf-embed :source="elem.url" :page="1" rotation="0" :height="220" />
        </div>
        <div class="ml-1 mr-2">
            <div class="flex items-center justify-center">
                <span class="iconify text-[14pt]" data-icon="vscode-icons:file-type-pdf2"></span>
                <span class="ml-1 text-[8pt]">PDF</span>
            </div>
            <div class="text-xs fw-400 text-center p-1 border rounded shadow hover:bg-gray-200">
                <a :href="elem.url" target="_blank">
                    {{ elem.nome }}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import VuePdfEmbed from 'vue-pdf-embed'

export default {
    components: { VuePdfEmbed },
    props: {
        elem: { default: null, type: Object }
    },
    data() {
        return {
            //src: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf"
            src: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/teste%2FAcoplador%20direcional.pdf?alt=media&token=7864c861-5a1d-4f0e-be36-1f0a39bb38d4"
        }
    },
    mounted() {

    },
    methods: {

    },
}
</script>
<style lang="">
    
</style>