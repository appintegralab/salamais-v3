<template>
    <div class="col-span-1 py-5 text-center" v-if="user != null">
        <q-avatar class="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]">
            <q-img :src="user.urlFoto" />
        </q-avatar>
        <div class="relative -mt-6 ml-12 sm:ml-16" v-if="isMe" @click="changeFoto">
            <q-avatar size="xs" class="bg-slate-500 text-white cursor-pointer">
                <span class="text-xs iconify" data-icon="ic:round-photo-camera"></span>
            </q-avatar>
        </div>
        <input ref="file" style="display: none" type="file" @change="detectFiles($event.target.files)">
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
                <span class="text-[6pt]">Imagem alterada com sucesso!</span>
            </div>
        </div>
    </div>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, orderByChild, equalTo, onValue, set } from "firebase/database"
import { userStore } from "../../stores/user-store"
import { storage } from '@/firebase/firebase.js'

export default {
    props: {
        userID: { default: "noid", type: String }
    },
    data() {
        return {
            userStore: userStore(),
            isMe: false,
            user: null,
            progressUpload: 0,
            progress: false,
            done: false,
            file: File,
            uploadTask: '',
        }
    },
    watch: {
        userID() {
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
            if (this.userID == this.userStore.user.id) {
                this.isMe = true
                this.user = this.userStore.user
            } else {
                onValue(ref(rdb, "/salamais/usuarios/" + this.userID), (snap) => {
                    self.user = snap.val()
                })
            }
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
            this.uploadTask = storage.ref('/profiles/' + this.userStore.user.id + ".png").put(file);
        },

        saveUrl(url) {
            //console.log("saveUrl", url);
            let path = "/salamais/usuarios/" + this.userID + "/urlFoto"
            //console.log(path, url);
            set(ref(rdb, path), url)
            this.user.urlFoto = url
        }
    },
}
</script>
<style lang="">
    
</style>