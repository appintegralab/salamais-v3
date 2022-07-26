<template>
    <div>

        <div v-if="label!=''" :class="styles.label()">
            {{label}}
        </div>
        <input ref="campo" name="nome" v-model="field.value" :class="styles.input()" :placeholder="holder">
        <p v-if="field.errorMessage" :class="styles.error()">
            {{ field.errorMessage }}
        </p>
    </div>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import styles from './m-wind-styles';

export default {
    props: {
        label: { default: "", type: String },
        holder: { default: "", type: String },
        rules: { default: [], type: Array }
    },
    data() {
        return {
            field: {},
            styles: styles,
            filled: true,
        }
    },
    mounted() {

        this.field = useField("nome", this.checkRules);
        console.log("this.fields", this.field);
    },
    methods: {

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