<template>
    <span>
        <span>versão</span>
        <span class="rounded border ml-1 px-1 finter text-[8pt] fw-500 border-white">
            22.07.31.23.55 - {{ rdbmode }}
        </span>
    </span>
</template>

<script>
import { rdbmode } from '@/firebase/firebase'

export default {
    data() {
        return {
            rdbmode: rdbmode
        }
    },
}
</script>
<style lang="">
    
</style>