<template>
    <div>
        <q-btn size="xs" class="flex items-center mr-2 px-2" @click="done = false" outline>
            <span class="iconify text-[12pt] mr-1" data-icon="uil:book-reader"></span>
            <span class="iconify pt-[2px]">
                Adicionar material
            </span>
            <q-menu v-model="UploadMenu">
                <div class="p-2 shadow-lg w-[360px]">
                    <div class="flex text-[8pt] fw-600">
                        Adicionar materiais
                    </div>
                    <hr class="mb-2">
                    <div class="flex items-center">
                        <q-btn size="xs" class="flex items-center mr-2 px-2" outline @click="clickPdf">
                            <span class="iconify text-[12pt] mr-1" data-icon="ic:outline-cloud-upload"></span>
                            <span class="iconify pt-[2px]">
                                Adicionar arquivo
                            </span>
                        </q-btn>
                        <q-btn size="xs" class="flex items-center mr-2 px-2" outline @click="clicklink">
                            <span class="iconify text-[12pt] mr-1" data-icon="ic:round-insert-link"></span>
                            <span class="iconify pt-[2px]">
                                Adicionar link
                            </span>
                        </q-btn>
                        <q-btn size="xs" class="flex items-center mr-2 px-2" outline @click="clickVideo">
                            <span class="iconify text-[12pt] mr-1" data-icon="ion:social-youtube-outline"></span>
                            <span class="iconify pt-[2px]">
                                Video Youtube
                            </span>
                        </q-btn>
                        <input ref="file" style="display: none" type="file" multiple
                            @change="detectFiles($event.target.files)">
                    </div>
                    <div class="mt-1">
                        <q-linear-progress v-if="progress" size="12px" :value="progressUpload" color="blue-grey">
                            <div class="absolute-full flex flex-center">
                                <span class="text-[7pt] fw-600 text-white">
                                    {{ progressUpload }} %
                                </span>
                            </div>
                        </q-linear-progress>
                        <div v-if="done" class="flex itens-center mt-1 fw-600 text-green-800">
                            <span class="iconify text-[10pt] mr-1" data-icon="ic:baseline-check-circle"></span>
                            <span class="text-[7pt]">Material adicionado com sucesso!</span>
                        </div>
                    </div>
                </div>
            </q-menu>
        </q-btn>

    </div>
</template>

<script>
import { storage } from '@/firebase/firebase.js'

export default {
    props: {
        path: { default: "nopath", type: String }
    },
    data() {
        return {
            progressUpload: 0,
            progress: false,
            done: false,
            file: File,
            uploadTask: '',
            UploadMenu: false,
            tipo: "notipo",
            nome: "",
        }
    },
    watch: {
        uploadTask: function () {
            let self = this
            this.uploadTask.on('state_changed', sp => {
                this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                if (this.progressUpload == 100) {
                    setTimeout(() => {
                        self.done = true
                        self.progress = false
                    }, 600)
                }
            },
                null,
                () => {
                    this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.$emit('url', { downloadURL, tipo: self.tipo, nome: self.nome })
                    })
                })
        }
    },
    methods: {
        detectFiles(fileList) {
            this.progress = true
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },
        upload(file) {
            let filePath = this.path + "/" + file.name
            console.log(file);
            console.log("filePath", filePath);
            this.nome = file.name
            this.uploadTask = storage.ref(filePath).put(file);
        },

        clickPdf() {
            console.log("upload", this.path);
            this.$refs.file.click()
            this.tipo = "file"
        },

        clickVideo() {
            this.UploadMenu = false
            this.tipo = "video"
        },

        clicklink() {
            this.UploadMenu = false
            this.tipo = "link"
        }



    }
}
</script>

<style>
.progress-bar {
    margin: 10px 0;
}
</style>