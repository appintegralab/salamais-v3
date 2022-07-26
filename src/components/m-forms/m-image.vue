<template >
    <div v-if="field != null">
        <div class="flex items-center">
            <div :style="`width: ${field.width}; height: ${field.height}`">
                <img :src="_field.value" />
            </div>
            <div class="flex-1 mx-2">
                <div v-if="field.label != ''" :class="styles.label()">
                    {{ field.label }}
                </div>
                <input disabled class="w-full text-xs border rounded px-2 py-1" v-model="_field.value"/>
                
                <div v-if="_field.errorMessage" :class="styles.error()">
                    <span class="iconify mr-1 text-sm" data-icon="ph:warning-octagon-duotone"
                        data-inline="false"></span>
                    <span class="text-xs mr-1 font-medium">{{ field.label }}</span>
                    {{ _field.errorMessage }}
                </div>
                <div class="mt-1">
                    <q-btn size="sm" @click="changeFoto">
                        <span class="iconify text-base mr-1" data-icon="icon-park-outline:upload-picture"
                            data-inline="false"></span>
                        carregar imagem
                    </q-btn>
                </div>
            </div>
            <div>

            </div>
        </div>
        <div class="mt-1">
            <q-linear-progress v-if="progress" size="12px" :value="progressUpload" color="blue-grey">
                <div class="absolute-full flex flex-center">
                    <span class="text-[7pt] fw-600 text-white">
                        {{ progressUpload }} %
                    </span>
                </div>
            </q-linear-progress>
            <div v-if="done" class="flex itens-center justify-center mt-2 fw-600 text-green-800">
                <span class="iconify text-[10pt] mr-1" data-icon="ic:baseline-check-circle"></span>
                <span class="text-[6pt]">Imagem carregada com sucesso!</span>
            </div>
        </div>
        <input ref="file" style="display: none" type="file" @change="detectFiles($event.target.files)">

    </div>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import styles from './m-wind-styles';
import { storage } from '@/firebase/firebase.js'
import newID from "@/components/utils/newID.js"

export default {
    props: {
        field: { default: null, type: Object }
    },
    data() {
        return {
            _field: {
                value: ""
            },
            styles: styles,
            progressUpload: 0,
            progress: false,
            done: false,
            file: File,
            uploadTask: '',
        }
    },
    watch: {
        field() {
            this.load()
        },
        uploadTask: function () {
            let self = this
            this.uploadTask.on('state_changed', sp => {
                this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                if (this.progressUpload == 100) {
                    setTimeout(() => {
                        self.done = true
                        self.progress = false
                        setTimeout(() => {
                            self.done = false
                        }, 2000)
                    }, 600)
                }
            },
                null,
                () => {
                    this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.saveUrl(downloadURL)
                    })
                })
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let self = this
            //console.log("this.field", this.field);
            if (this.field) {
                this._field = useField(this.field.name, this.checkRules);
                if (this.field.default != "") {
                    this._field.value = this.field.value
                }
                if (this.field.value != this.field.default) {
                    this._field.value = this.field.value
                }
                //console.log("this.field", this.field);
                //console.log("this._field", this._field);
                this._field.handleChange
            }
        },

        checkRules(value) {
            //console.log(value);
            try {
                let ret = this.field.yupRules.validateSync(value)
                return true
            } catch (e) {
                let msg = e.message.replaceAll("this", "")
                //msg = msg + " " + e.message.replaceAll("this","")
                //console.dir(e);
                return msg.trim()
            }
        },

        change() {
            //console.log("this._field.value",this._field.value);
            this.field.value = this._field.value
            this.$emit('onChange', { fieldName: this.field.name })
        },

        changeFoto() {
            //console.log("changeFoto");
            this.$refs.file.click()
        },

        detectFiles(fileList) {
            this.progress = true
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },

        upload(file) {
            console.log("file", file);
            this.uploadTask = storage.ref(this.field.pathToSave + newID() + file.name).put(file);
        },

        saveUrl(url) {
            //console.log("saveUrl", url);
            //let path = "/salamais/usuarios/" + this.userID + "/urlFoto"
            //console.log(path, url);
            //set(ref(rdb, path), url)
            //this.user.urlFoto = url
            this._field.value = url
            this.field.value = this._field.value
            console.log(this._field.value);
            this.$emit('onChange', { fieldName: this.field.name })
        }
    },
}
</script>
<style lang="">
    
</style>