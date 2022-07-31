<template>
    <div class="flex">
        <div >
            <div class="w-[100px] h-[100px]" ref="canvas"></div>
        </div>
        <div class="flex-1">
            oi gente
        </div>
    </div>
</template>

<script>
import QRCodeStyling from "qr-code-styling"

export default {
    data() {
        return {

        }
    },
    mounted() {

        this.load()

    },
    methods: {

        load() {
            const qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                type: "svg",
                data: "https://www.facebook.com/",
                image: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/salamais%2Fsalamais-icon.png?alt=media&token=f19ed46e-2179-466d-ac5c-186133895d87",
                dotsOptions: {
                    color: "#4267b2",
                    type: "square"
                },
                backgroundOptions: {
                    color: "#e9ebee",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 10,
                    imageSize: 0.5,
                }
            });

            qrCode.append(this.$refs.canvas);
            let svg = this.$refs.canvas.firstChild
            console.log("svg",svg);
            //svg.setAttribute("width", "100px");
            //svg.setAttribute("height", "100px");
            //svg.setAttribute("preserveAspectRatio","xMaxYMax meet")
            //qrCode.download({ name: "qr", extension: "svg" });
            let data = qrCode.getRawData('svg')
            console.log("data", data);
        }
    },
}
</script>
<style lang="">
    
</style>