<template>
    <div class="m-4">
        <div class="flex justify-center">
            <div class="flex-1">
                <div class="mt-3 mx-2 py-2 text-sm fraleway text-center">
                    <p class="text-sm font-light">
                        <span class="font-semibold">Olá professor!</span>
                        Estamos muito felizes com sua participação no
                        <span class="text-sm font-extrabold fraleway">Sala Mais!</span>
                        Mas e você?
                    </p>
                    <p class="mt-1 text-sm fraleway font-light text-black">
                         Gostou de participar?
                    </p>
                    <p class="border rounded py-1 mt-1 text-sm fraleway font-bold text-black">
                        Queremos muito saber a sua opinião!
                    </p>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-[200px]">
                    <img src="@/assets/survey.png" alt="">
                </div>
            </div>
        </div>
        <div class="mx-2 px-2 text-sm fraleway text-center">
            <p class="mb-2 font-light text-sm">
                Por isso, estamos te convidando a responder um formulário de pesquisa de avaliação.
                <span class="my-2 font-bold fraleway">
                    Leva menos de 1 minuto pra responder!
                </span>
            </p>
            <p class="my-3 font-bold text-base text-purple-900">
                Podemos contar com o seu feedback? <span class="text-xl">🙂</span>
            </p>
        </div>
        <hr>
        <div class="m-2 p-2">
            <div class="flex items-center justify-center">
                <q-btn size="sm" @click="$emit('cancel')">
                    não tenho interesse
                </q-btn>
                <q-btn size="sm" class="ml-4" color="purple-9" @click="$emit('responder')">
                    responder
                </q-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">
    
</style>