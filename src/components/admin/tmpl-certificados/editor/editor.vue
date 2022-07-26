<template>
    <div class="border p-2 rounded">
        <span v-for="(elem, index) in elems" :key="index">
            <span v-if="elem.type == `edit`">
                <mtext :index="index" :value="elem.value" @onChange="onChange" @showMenu="showMenu(index)"
                    @hideMenu="hideMenu" :key="refresh + index" />
            </span>
            <span v-if="elem.type == `mention`" class="cursor-pointer">
                <mention :item="elem.item" @remove="removeMention(index)" :key="refresh + index" />
            </span>
        </span>
        <mmenu ref="mmenu" @addMention="addMention" />
    </div>
</template>

<script>
import mtext from "./text.vue"
import mmenu from "./menu.vue"
import mention from "./mention.vue"
import newID from "@/components/utils/newID"

export default {
    components: { mtext, mmenu, mention },
    props: {
        contents: { default: [], type: Array }
    },
    data() {
        return {
            refresh: 0,
            menu: false,
            elems: [
                { type: "edit", value: "" },
                //{ type: "mention", item: { id: newID(), label: "Nome do participante", value: "nome" } },
                //{ type: "edit" , value: "outra coisa"},
            ],
            lastElem: null
        }
    },
    watch: {
        contents() {
            this.elems = this.contents
            if (this.elems.length == 0) {
                this.elems.push({ type: "edit", value: "" })
            }
        }
    },
    mounted() {
        this.elems = this.contents
        if (this.elems.length == 0) {
            this.elems.push({ type: "edit", value: "" })
        }
    },
    methods: {

        onChange(data) {
            console.log("onChange", data);
            this.elems[data.index].value = data.value
            this.$emit('onChange',this.elems)
        },

        showMenu(index) {
            console.log("showMenu", index);
            this.$refs.mmenu.show(index)
        },

        hideMenu() {
            console.log("menuHide");
            this.$refs.mmenu.hide()
        },

        addMention(data) {
            console.log("addMention", data);
            let newItem = {
                item: data.elem,
                type: "mention",
                id: newID()
            }
            console.log("newItem", newItem);
            let itemPos = this.elems[data.insertID]
            let textLeft = itemPos.value.substr(0, data.caretPos).trim()
            let textRight = itemPos.value.substr(data.caretPos).trim()
            if (textRight.charAt(0) == "@") {
                textRight = textRight.substr(1)
            }
            console.log({ textLeft, textRight });
            this.elems.splice(data.insertID, 1, { type: "edit", value: textLeft })
            this.elems.splice(data.insertID + 1, 0, newItem)
            this.elems.splice(data.insertID + 2, 0, { type: "edit", value: textRight })
            console.log("this.elems", this.elems);
            this.refresh++
            this.$forceUpdate()
            this.$emit('onChange',this.elems)
        },

        removeMention(index) {
            console.log("removeMention", index);
            if (index > 0 && index < this.elems.length) {
                let elemLeft = this.elems[index - 1]
                let elemRight = this.elems[index + 1]
                console.log({ elemLeft, elemRight });
                let newText = elemLeft.value.trim() + elemRight.value.trim()
                this.elems.splice(index - 1, 3, { type: "edit", value: newText })
            } else {
                this.elems.splice(index, 1)
            }
            this.$emit('onChange',this.elems)
        },

        getContents() {
            return this.elems
        }
    },

}
</script>
<style lang="">
    
</style>