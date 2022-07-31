<template>
    <div>
        <div class="flex justify-center">
            <div class="flex justify-center">
                <div class="w-[420px]">
                    <img src="@/assets/pablo-scooter.png" alt="">
                </div>
            </div>
        </div>
        <div class="mx-2 px-2 text-sm fraleway text-center">
            <p class="my-2 text-sm text-green-700 font-medium">
                Suas respostas foram registradas com sucesso!
            </p>
            <p class="my-2 text-lg font-medium text-purple-900">
                Obrigado pela sua participação! 🙂
            </p>
        </div>
        <hr>
        <div class="m-2 p-2">
            <div class="flex items-center justify-center">
                <q-btn size="sm" @click="$emit('cancel')">
                    fechar
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