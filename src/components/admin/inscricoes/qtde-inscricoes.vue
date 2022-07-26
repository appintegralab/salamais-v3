<template>
    <div class="flex items-center">
        <span class="text-[8pt] rounded bg-slate-200 pl-1 pr-3 pt-[1px]">Inscrições</span>
        <span class="-ml-2 px-1 pt-[2px] rounded-lg bg-slate-300 text-black text-[8pt] fw-600">{{ qtde }}</span>
    </div>
</template>

<script>

export default {
    props: {
        formacao: { default: null, type: Object }
    },
    data() {
        return {
            inscricoes: null,
            qtde: 0,
        }
    },
    mounted() {
        let self = this
        console.log("this.formacao", this.formacao);
        this.qtde = 0
        for (let i in this.formacao.encontros) {
            let encontro = this.formacao.encontros[i]
            for (let k in encontro.salas) {
                if (encontro.salas[k].inscricoes != undefined) {
                    this.qtde = this.qtde + Object.keys(encontro.salas[k].inscricoes).length
                }
            }
            for (let key in encontro.areas) {
                let area = encontro.areas[key]
                for (let k in area.salas) {
                    if (area.salas[k].inscricoes != undefined) {
                        this.qtde = this.qtde + Object.keys(area.salas[k].inscricoes).length
                    }
                }
            }
        }
        console.log("qtde", this.qtde);
        //let model = cb("salamais").coll("inscricoes")
        //model.find({ formacaoID: this.formacao.id }, {}, { sort: { dataInicio: 1 } }).then((data) => {
        //    self.inscricoes = data;
        //    console.log("self.inscricoes",self.inscricoes);
        //})
    },
    methods: {

    }
}
</script>
<style lang="">
    
</style>