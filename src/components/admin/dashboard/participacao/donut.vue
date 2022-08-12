<template>
    <div ref="myChart" :style="`width: ${size}px; height: ${size}px;`"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        size: { default: 150, type: Number },
        data: { default: [], type: Array },
    },
    data() {
        return {
            _data: []
        }
    },
    watch: {
        data() {
            if (this.data.length == 0) {
                this._data = [
                    { value: 10, name: 'label 1' },
                    { value: 100, name: 'label 2' },
                ]
            } else {
                this._data = this.data
            }
            this.load()
        }
    },
    mounted() {
        //console.log("this.data.length", this.data.length);
        if (this.data.length == 0) {
            this._data = [
                { value: 10, name: 'label 1' },
                { value: 100, name: 'label 2' },
            ]
        } else {
            this._data = this.data
        }
        this.load()
    },
    methods: {

        load() {
            // initialize the echarts instance
            let myChart = echarts.init(this.$refs.myChart);
            let option = {
                color: ['#9ca3af', '#0d9488'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{b0}: {c0}'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '95%'],
                        label: {
                            position: 'inside',
                            fontSize: 11,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            formatter: function (d) {
                                //console.log("d", d);
                                return d.percent.toFixed(1) + "%";
                            }
                        },
                        labelLine: {
                            show: false,
                        },
                        data: this._data
                    }
                ]
            };
            myChart.setOption(option)
        }
    },
}
</script>
<style lang="">
    
</style>