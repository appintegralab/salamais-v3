<template>
    <span contenteditable="false" class="border rounded bg-gray-300">
        foo {{texto}} foo
    </span>
</template>

<script>

export default {
    props: {
        texto: { default: "texto", type: String }
    },
    data() {
        return {
            
        }
    },    
}
</script>
<style lang="">
    
</style>