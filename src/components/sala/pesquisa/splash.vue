<template>
    <div>
        <div>
            <div class="m-2 p-2 text-sm fraleway border rounded">
                <p>
                    Olá professor!
                </p>
                <p class="my-3">
                    Estamos muito felizes com sua participação no <b>Sala Mais</b>!
                </p>
                <p class="my-2">
                    Mas e você, gostou de participar? Queremos muito saber a sua opinião!
                </p>
                <p class="my-1">
                    Por isso, estamos te convidando a responder um formulário de pesquisa de avaliação.
                </p>
                <p class="my-2 font-semibold finter">
                    Leva menos de 1 minuto pra responder!
                </p>
                <p>
                    Podemos contar o seu feedback? 🙂
                </p>
            </div>
            <hr>
            <div class="m-2 p-2">
                <div class="flex items-center justify-center">
                    <q-btn size="sm" @click="$emit('cancel')">
                        não tenho interesse
                    </q-btn>
                    <q-btn size="sm" class="ml-4" color="green" @click="$emit('responder')">
                        responder
                    </q-btn>
                </div>
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