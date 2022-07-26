<template >
    <span class="">
        <span v-show="content != ''" ref="edit" :contenteditable="editable" @click="focus" @blur="blur"
            @keydown="keydown" @keyup="keyup" class="outline-none">

        </span>
        <span v-if="content == ''" class="border rounded-lg cursor-pointer" @click="addText">
            <i class="iconify inline-block" data-icon="mdi:dots-horizontal"></i>
        </span>
        <span v-if="tip">
            <i class="iconify inline-block" data-icon="eos-icons:typing"></i>
            <!--<span class="font-thin text-xs ml-1">comece a digitar</span>-->
        </span>
    </span>
</template>

<script>

export default {
    props: {
        value: { default: "", type: String },
        index: { default: 0, type: Number }
    },
    data() {
        return {
            refresh: 0,
            editable: false,
            content: "",
            styles: "text-lg outline",
            tip: false,
        }
    },
    watch: {
        value() {
            this.content = this.value
            this.$refs.edit.textContent = this.content
        }
    },
    mounted() {
        this.content = this.value
        this.$refs.edit.textContent = this.content
    },
    methods: {
        focus() {
            console.log("focus");
            this.editable = true
            this.$nextTick(() => {
                this.$refs.edit.focus()
            })
            this.$emit('hideMenu', this.$refs.edit)
        },
        blur() {
            console.log("blur");
            this.editable = false
            if (this.content.trim() == "") {
                this.content = ""
                this.tip = false
            }
            //this.$emit('hideMenu',this.$refs.edit)
        },

        keydown(e) {
            console.log(e);
            this.tip = false
            if (e.key == "@") {
                console.log("@");
                this.$emit('showMenu', this.$refs.edit)
            } else {
                this.$emit('hideMenu', this.$refs.edit)
            }
        },

        keyup(e) {
            console.log(e);
            this.content = this.$refs.edit.textContent
            this.$emit('onChange', { value: this.content, index: this.index })
            console.log("this.content", this.content);
            if (this.content.indexOf("⌨️") != -1) {
                this.content.replaceAll("⌨️", "")
                this.$refs.edit.textContent = this.content
            }
        },

        addText() {
            let self = this
            this.editable = true
            this.content = " "
            this.$refs.edit.textContent = " "
            this.$forceUpdate()
            this.$nextTick(() => {
                this.$refs.edit.focus()
            })
            this.tip = true
        }

    },
}
</script>
<style lang="">
    
</style>