<template>
    <div v-if="field != null">
        <div v-if="field.label != ''" :class="styles.label()">
            {{ field.label }}
        </div>
        <input ref="campo" :name="field.name" v-model="_field.value" :class="styles.input()" :placeholder="field.holder">
        <p v-if="_field.errorMessage" :class="styles.error()">
            {{ _field.errorMessage }}
        </p>
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
            console.log("this.field", this.field);
            if (this.field) {
                this._field = useField(this.field.name, this.field.yupRules);
                console.log("this.field", this.field);
            }
        },

        checkRules(value) {
            //console.log(value);
            if (value && value.trim()) {
                return true;
            }
            return 'This is required';
        }
    },
}
</script>
<style lang="">
    
</style>