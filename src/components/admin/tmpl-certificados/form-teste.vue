<template>
    <div class="m-3">
        Form Teste

        <div class="grid grid-cols-2">
            <div class="border rounded p-3">
                
                <editor />

            </div>

            <div>
                
            </div>

        </div>
    </div>
</template>

<script>
import editor from "./editor/editor.vue"

export default {
    components: { editor },
    props: {
    },
    data() {
        return {
            model: null,
            editor: null,
            refresh: 0,
        }
    },
    mounted() {


    },
    methods: {

        change(e) {
            console.log("change", e);
            const range = window.getSelection().getRangeAt(0);
            let caretPos = range.startOffset
            console.log("caretPos", caretPos);
            let parent = range.startContainer.parentElement
            let child = range.startContainer
            let nodeEsq = child.previousSibling
            console.log("nodeEsq", nodeEsq);
            console.dir(nodeEsq);
            let isMention = parent.getAttribute('xxx')
            console.log("isMention", isMention);
            if (isMention) {
                if (e.key == 'Backspace') {
                    parent.parentElement.removeChild(parent)
                }
                if (e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
                    e.preventDefault()
                }
            }
            if (e.key == 'Backspace') {
                if (caretPos == 0) {
                    let isMention = nodeEsq.getAttribute('xxx')
                    console.log("no esq mention", isMention);
                    if (isMention) {
                        nodeEsq.parentElement.removeChild(nodeEsq)
                    }
                }
            }
            if (e.key == "@") {
                e.preventDefault();
                this.pasteHtmlAtCaret(/*html*/`<wc-teste></wc-teste>`)
            }
        },

        keyup(e) {
            console.log("change", e);
            const range = window.getSelection().getRangeAt(0);
            let caretPos = range.startOffset
            console.log("caretPos", caretPos);

            console.log("this.$refs.cxa.textContent",this.$refs.cxa.textContent);
        },


        pasteHtmlAtCaret(html) {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        }
    },
}
</script>
<style>
.ProseMirror p {
    border: 1px solid black;
    display: inline-block;
}
</style>