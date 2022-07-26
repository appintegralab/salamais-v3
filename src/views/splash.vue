<template>
    <div class="h-[1200px]"
        style="background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(34,34,62,1) 49%, rgba(58,92,99,1) 100%);">
        <p class="mx-auto mb-0 text-white text-center finter pt-6 text-5xl fw-800">
            Sala Mais
        </p>
        <div class="mx-50 border-b border-gray-700"></div>
        <div class="text-center text-white finter pt-2 text-3xl fw-300">
            <span class="fs-30pt text-blue-grey-2 fw-800">Desenvolvimento</span> que
            <span class="m-0 text-center fs-36pt fw-800" style="color: #51a0c2;">Transforma</span>
            <p class="mx-10 mt-3 mb-0 text-center flato fs-12pt lh-3">
                O Sala Mais é um espaço para reflexão, trocas e trabalho de temas relevantes ao nosso ser e fazer
                docente. É a nossa “sala de professores” em ambiente virtual.
            </p>
            <div class="text-xs mt-2">
                <versaoVue />
            </div>
            <div v-if="false" @click="clickMsg"
                class="max-w-[400px] mx-auto mt-6 mb-0 border rounded shadow p-2 text-center flato fs-12pt lh-3">
                As inscrições serão abertas a partir do dia 22/06.
            </div>
        </div>
        <div class="mx-50 mt-3 border-b border-gray-700"></div>
        <div class="flex justify-center text-center pt-4">
            <button @click="showDialog"
                class="flex justify-center items-center border border-gray-700 bg-cyan-900 hover:bg-cyan-800 p-1 px-4 rounded text-white">
                <span class="iconify mr-2" data-icon="ic:outline-login" data-inline="false"></span>
                Acessar formações
            </button>
        </div>
        <div class="mt-2 flex items-center justify-center">
            <div class="p-4">
                <img class="w-[400px]" src="../assets/teacher6.png" />
            </div>
            <div class="p-4">
                <video width="480px" controls poster="https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/tutoriais%2Fposter-salamais.png?alt=media&token=e74868b9-ea3a-4ded-8fef-36010549a3e7">
                    <source src="https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/tutoriais%2Ftutorial-salamais-v2.mp4?alt=media&token=df628720-1148-40e2-9597-4e381239724f" type="video/mp4" >
                </video>
            </div>
        </div>


        <dialogaccess ref="dialogaccessref" @onLogin="$emit('onLogin')" @onCadastro="$refs.dialogemailref.show()" />
        <dialogemail ref="dialogemailref" @showCadastro="showCadastro" />
        <dialognewuser ref="dialognewuserref" @updated="showDialog" />
    </div>
</template>

<script>
import dialogaccess from "./dialog-access.vue"
import dialogemail from "./dialog-email.vue"
import dialognewuser from "./dialog-new-user.vue"
import versaoVue from "@/components/utils/versao.vue"

export default {
    components: { dialogaccess, dialogemail, dialognewuser, versaoVue },
    data() {
        return {
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/tutoriais%2Ftutorial-salamais.mp4?alt=media&token=09adeef8-c9a4-4661-996a-ab1240ac3822",
            posterUrl: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/tutoriais%2Fposter-salamais.png?alt=media&token=e74868b9-ea3a-4ded-8fef-36010549a3e7",
        }
    },
    methods: {

        showDialog() {
            console.log("showDialog", this.$refs);
            this.$refs.dialogaccessref.show()
        },

        showCadastro(user) {
            this.$refs.dialognewuserref.show(user)
        },

        clickMsg(evt) {
            //console.log(evt);
            if (evt.ctrlKey && evt.altKey) {
                console.log("Olá Marcelo!");
                this.showDialog()
            }
        },

        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
            console.log('the player is readied', player)
            // you can use it to do something...
            // player.[methods]
        }
    }
}
</script>

<style>
</style>