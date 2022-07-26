<template>
    <div v-if="field != null">
        <div v-if="field.label != ''" :class="styles.label()">
            {{ field.label }}
        </div>
        <input @keydown="change" @blur="change" ref="campo" :name="field.name" v-model="_field.value"
            :class="styles.input()" :placeholder="field.holder">
        <div v-if="_field.errorMessage" :class="styles.error()">
            <span class="iconify mr-1 text-sm" data-icon="ph:warning-octagon-duotone" data-inline="false"></span>
            <span class="text-xs mr-1 font-medium">{{field.label}}</span>
            {{ _field.errorMessage }}
        </div>
    </div>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import styles from './m-wind-styles';

export default {
    props: {
        field: { default: null, type: Object }
    },
    data() {
        return {
            _field: {},
            styles: styles,
            filled: true,
        }
    },
    watch: {
        field() {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            //console.log("this.field", this.field);
            if (this.field) {
                this._field = useField(this.field.name, this.checkRules);
                if (this.field.default != "") {
                    this._field.value = this.field.value
                }
                if (this.field.value != this.field.default) {
                    this._field.value = this.field.value
                }
                //console.log("this.field", this.field);
                //console.log("this._field", this._field);
                this._field.handleChange
            }
        },

        checkRules(value) {
            //console.log(value);
            try {
                let ret = this.field.yupRules.validateSync(value)
                return true
            } catch (e) {
                let msg = e.message.replaceAll("this","")
                //msg = msg + " " + e.message.replaceAll("this","")
                //console.dir(e);
                return msg.trim()
            }
        },

        change() {
            //console.log("this._field.value",this._field.value);
            this.field.value = this._field.value
            this.$emit('onChange', { fieldName: this.field.name })
        }
    },
}
</script>
<style lang="">
    
</style>