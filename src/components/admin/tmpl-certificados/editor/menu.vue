<template>
    <div v-if="visible">
        <div ref="menu1" class="z-[1000] border p-2 rounded absolute bg-white" :style="`top:${posY}px; left:${posX}px;`">
            <div v-for="(elem,index) in values" :key="index">
                <div @click="clickItem($event,elem)" class="py-0.5 px-2 my-0.5 bg-gray-100 hover:bg-gray-200 border rounded cursor-pointer" >
                    {{elem.label}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            visible: false,
            posX: 110,
            posY: 110,
            caretPos: 0,
            lastIndex: 0,
            values: [
                { label: "Nome do participante", value: "nome" },
                { label: "Nome da trilha", value: "nomeTrilha" },
                { label: "Data da trilha", value: "dataTrilha" },
                { label: "Data de emissão", value: "dataEmissao" },
                { label: "Área de conhecimento", value: "area" },
                { label: "Período", value: "periodo" },
                { label: "Carga horária", value: "ch" },
            ]
        }
    },
    mounted() {
        let self = this
        document.body.addEventListener('click', (e) => {
            let menu1 = self.$refs.menu1
            if (menu1 == undefined) {
                return
            }
            //console.log("click geral", e.target);
            //console.log("click menu1", menu1);
            if (!(menu1 == e.target || menu1.contains(e.target))) {
                //console.log("fora");
                self.visible = false
            }
        })
    },
    methods: {
        handleFocus() {
            // do something here
            console.log("handleFocus");
        },
        handleFocusOut() {
            // do something here
            console.log("handleFocusOut");
        },

        getCaretTopPoint() {
            const sel = document.getSelection()
            const r = sel.getRangeAt(0)
            let rect
            let r2
            // supposed to be textNode in most cases
            // but div[contenteditable] when empty
            const node = r.startContainer
            const offset = r.startOffset
            if (offset > 0) {
                // new range, don't influence DOM state
                r2 = document.createRange()
                r2.setStart(node, (offset - 1))
                r2.setEnd(node, offset)
                // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
                // IE9, Safari?(but look good in Safari 8)
                rect = r2.getBoundingClientRect()
                return { left: rect.right, top: rect.top }
            } else if (offset < node.length) {
                r2 = document.createRange()
                // similar but select next on letter
                r2.setStart(node, offset)
                r2.setEnd(node, (offset + 1))
                rect = r2.getBoundingClientRect()
                return { left: rect.left, top: rect.top }
            } else { // textNode has length
                // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
                rect = node.getBoundingClientRect()
                const styles = getComputedStyle(node)
                const lineHeight = parseInt(styles.lineHeight)
                const fontSize = parseInt(styles.fontSize)
                // roughly half the whitespace... but not exactly
                const delta = (lineHeight - fontSize) / 2
                return { left: rect.left, top: (rect.top + delta) }
            }
        },

        cursorPosition() {
            const sel = document.getSelection();
            sel.modify("extend", "backward", "paragraphboundary");
            const pos = sel.toString().length;
            if (sel.anchorNode !== undefined) {
                sel.collapseToEnd();
            }
            return pos;
        },

        show(id) {
            this.visible = true
            this.lastID = id
            let pos = this.getCaretTopPoint()
            console.log("cursor", pos);
            let caretPos = this.cursorPosition()
            this.caretPos = caretPos
            console.log("caretPos", caretPos);
            this.posX = parseInt(pos.left)
            this.posY = parseInt(pos.top + 20)
        },

        hide() {
            this.visible = false
        },

        clickItem(e,elem) {
            console.log("clickItem",{e,elem});
            this.$emit(`addMention`, { elem, insertID: this.lastID, caretPos: this.caretPos })
            this.visible = false
            e.preventDefault();            
        }
    },
}
</script>
<style lang="">
    
</style>