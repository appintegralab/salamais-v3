<template>
    <q-drawer :breakpoint="800" v-model="leftDrawerOpen" bordered :width="180">
        <q-scroll-area class="fit">
            <div class="mt-2 mx-2">
                <img class="w-[130px]" src="../assets/salamais-rect.png">
            </div>
            <div class="border-t mt-1 mx-2"></div>

            <div @click="$router.push({ path: '/' })"
                class="flex items-center h-[36px] mr-2 p-2 hover:bg-gray-200 cursor-pointer">
                <div class="ml-1 text-[18pt] text-slate-900">
                    <span class="iconify" data-icon="ph:book-duotone"></span>
                </div>
                <div class="ml-1 text-[10pt] text-slate-900 froboto fw-400">
                    Formações
                </div>
            </div>
            <div @click="$router.push({ path: '/inscricoes' })"
                class="flex items-center h-[36px] mr-2 p-2 hover:bg-gray-200 cursor-pointer">
                <div class="ml-1 text-[18pt] text-slate-900 ">
                    <span class="iconify" data-icon="ph:book-open-duotone"></span>
                </div>
                <div class="ml-1 text-[10pt] text-slate-900 froboto fw-400">
                    Minhas inscrições
                </div>
            </div>
            <div @click="$router.push({ path: '/concluidas' })"
                class="flex items-center h-[36px] mr-2 p-2 hover:bg-gray-200 cursor-pointer">
                <div class="ml-1 text-[18pt] text-slate-900">
                    <span class="iconify" data-icon="ph:book-bookmark-duotone"></span>
                </div>
                <div class="ml-1 text-[10pt] text-slate-900 froboto fw-400">
                    Certificados
                </div>
            </div>
            <div v-if="facilitador" @click="$router.push({ path: '/facilitador' })"
                class="flex items-center h-[36px] mr-2 p-2 hover:bg-gray-200 cursor-pointer">
                <div class="ml-1 text-[18pt] text-slate-900">
                    <span class="iconify" data-icon="ph:chalkboard-teacher-fill"></span>
                </div>
                <div class="ml-1 text-[10pt] text-slate-900 froboto fw-400">
                    Multiplicador
                </div>
            </div>
        </q-scroll-area>
    </q-drawer>
</template>

<script>
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import { userStore } from "@/stores/user-store"

export default {
    data() {
        return {
            leftDrawerOpen: true,
            userStore: userStore(),
            facilitador: false,
            storage: "",
        }
    },
    watch: {
        'userStore.user': function (newValue) {
            //console.log("watch store", this.userStore.user);
            let self = this
            get(rdbref("facilitadores/" + this.userStore.user.id)).then((snap) => {
                if (snap.val() != null) {
                    self.facilitador = true
                    self.$forceUpdate()
                } else {
                    self.facilitador = false
                }
            })
        }
    },
    mounted() {
        let self = this
        get(rdbref("facilitadores/" + this.userStore.user.id)).then((snap) => {
            if (snap.val() != null) {
                self.facilitador = true
            } else {
                self.facilitador = false
            }
        })
    },
    methods: {
        toggle() {
            this.leftDrawerOpen = !this.leftDrawerOpen
        }
    }
}
</script>

<style>
</style>