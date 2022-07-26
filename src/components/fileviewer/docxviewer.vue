<template>
    <div>
        <div class="grid grid-cols-3 m-2">
            <div class="flex items-center border rounded">
                <div class="">
                    <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/teste%2Fteste01.docx?alt=media&token=be63c8a9-3a48-4212-be38-fa699b9d68d4' width='px'
                        height='px' frameborder='0'>
                    </iframe>

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
//import VueDocPreview from 'vue-doc-preview'
import axios from "axios"
import docx2html from "docx2html"
import docx4js from "docx4js"

export default {
    components: { VuePdfEmbed },
    data() {
        return {
            //src: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf"
            src: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/teste%2FAcoplador%20direcional.pdf?alt=media&token=7864c861-5a1d-4f0e-be36-1f0a39bb38d4",
            srcdoc: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/teste%2Fteste01.docx?alt=media&token=be63c8a9-3a48-4212-be38-fa699b9d68d4"
        }
    },
    mounted() {
        console.log(docx2html);
        console.log(docx4js);
        axios({
            url: this.srcdoc,
            method: 'GET',
            responseType: 'blob', // important
        }).then((res) => {
            console.log("res", res);
            let blob = new Blob([res.data])
            const myFile = new File([new Blob([res.data])], 'teste01.docx', {
                type: res.data.type,
            });
            docx2html(blob).then((html) => {
                console.log("html", html);
            })
            console.log(blob);
        })



    },
    methods: {

    },
}
</script>
<style lang="">
    
</style>