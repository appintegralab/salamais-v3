<template>
    <div>
        <div class="grid grid-cols-3 m-2">
            <div class="flex items-center border rounded">
                <div class="">
                    <vue-pdf-embed :source="src" :page="1" rotation="90" :height="70" />
                </div>
                <div class="flex-1 ml-1 mr-2">
                    <div class="text-xs  leading-3">
                        Algum arquivo com nome
                    </div>
                    <div class="flex items-center">
                        <span class="iconify text-[14pt]" data-icon="vscode-icons:file-type-pdf2"></span>
                        <span class="ml-1 text-[8pt]">PDF</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center border rounded">
                <div class="">
                    <vue-pdf-embed :source="src" :page="1" rotation="90" :height="70" />
                </div>
                <div class="flex-1 ml-1 mr-2">
                    <div class="text-xs  leading-3">
                        Algum arquivo com nome
                    </div>
                    <div class="flex items-center">
                        <span class="iconify text-[14pt]" data-icon="vscode-icons:file-type-pdf2"></span>
                        <span class="ml-1 text-[8pt]">PDF</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VuePdfEmbed from 'vue-pdf-embed'

export default {
    components: { VuePdfEmbed },
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