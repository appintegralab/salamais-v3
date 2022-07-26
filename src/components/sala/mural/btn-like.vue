<template>
    <div>
        <q-btn v-if="!iLiked" @click="liked" round size="xs" class="mr-1">
            <span class="iconify text-lg" data-icon="ph:heart-duotone"></span>
            <div v-if="likes!= null" class="absolute -right-1 -bottom-1">
                <span class="text-[7pt] fw-600 rounded-lg text-red-900 bg-red-300 px-[3px] py-[1px]">
                    {{Object.keys(likes).length}}
                </span>
            </div>
            <q-tooltip :delay="1000" v-if="likes!= null">
                <div v-for="(userID,key,index) in likes" :key="key">
                     <userAvatar v-if="index<10" :userID="key" />
                </div>
                <div v-if="Object.keys(likes).length > 10" class="text-center mt-1">
                    mais {{Object.keys(likes).length -10}}
                </div>
            </q-tooltip>
        </q-btn>
        <q-btn v-if="iLiked" @click="liked" round size="xs" class="mr-1">
            <span class="iconify text-red text-lg" data-icon="ph:heart-duotone"></span>
            <div v-if="likes!= null" class="absolute -right-1 -bottom-1">
                <span class="text-[7pt] fw-600 rounded-lg text-red-900 bg-red-200 px-[3px] py-[1px]">
                    {{Object.keys(likes).length}}
                </span>
            </div>
            <q-tooltip :delay="1000" v-if="likes!= null">
                <div v-for="(userID,key,index) in likes" :key="key">
                     <userAvatar v-if="index<10" :userID="key" />
                </div>
                <div v-if="Object.keys(likes).length > 10" class="text-center mt-1">
                    mais {{Object.keys(likes).length -10}}
                </div>
            </q-tooltip>
        </q-btn>
    </div>
</template>

<script>
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import { userStore } from "@/stores/user-store"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import userAvatar from "./user-avatar.vue"

export default {
    components: { userAvatar },
    props: {
        postID: { default: "noid", type: String }
    },
    data() {
        return {
            userStore: userStore(),
            likes: null,
            iLiked: false,
        }
    },
    watch: {
        postID() {
            this.load()
        },
        messageID() {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this

            onValue(ref(rdb, "/salamais/likes/" + this.postID), (snap) => {
                self.likes = snap.val()
                console.log("self.likes", self.likes);
                self.iLiked = false
                if(self.likes) {
                    if(self.likes[self.userStore.user.id] != undefined) {
                        self.iLiked = true
                    }
                } 
            })
        },

        liked() {
            console.log("this.iLiked",this.iLiked);
            console.log("this.postID",this.postID);
            let path = "/salamais/likes/"+this.postID+"/"+this.userStore.user.id
            console.log(path);
            if(this.iLiked) {
                set(ref(rdb,path),null)
            } else {
                set(ref(rdb,path),moment().format())
            }
        }
    },
}
</script>
<style lang="">
    
</style>