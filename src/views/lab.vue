<template>
    <div>
        lab
        <q-btn @click="loadUsersFirebase">loadUsersFirebase</q-btn>
        <q-btn @click="loadAreas">loadAreas</q-btn>
    </div>
</template>

<script>
//import users from './lab/users.js';
import areas from './lab/areas.js';
import { cb } from "../clapback/clapback.js"
import users from "./lab/usuarios.js"
import { rdb } from "../clapback/firebase.js"
import { ref, get, set, onValue } from "firebase/database"

export default {
    data() {
        return {
            router: "lab"
        }
    },
    mounted() {
        console.log("lab mounted users", users);
        console.log("lab mounted areas", areas);
        let model = cb("salamais").coll("usuarios")
        model.getAll().then((data) => {
            console.log("usuarios", data);
        })
    },
    methods: {

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 6);
        },

        loadUsersFirebase() {
            let self = this
            console.log("users", users);
            for (let i in users) {
                let user = users[i]
                let userRef = ref(rdb, "/salamais/usuarios/" + user.id)
                set(userRef, user)
            }
            console.log("foi?");
        },

        loadUsers() {
            let self = this
            //console.log(this.uuidv4());
            let model = cb("salamais").coll("usuarios")
            console.log(model);
            return
            async function addUsers() {
                for (let idx in users) {
                    let { nome, email, cpf, telefone, ies, urlFoto } = users[idx]
                    //console.log(nome);
                    let user = {
                        nome, email, cpf, telefone, ies, urlFoto,
                        id: self.uuidv4(nome)
                    }
                    await model.push(user)
                }
            }
            addUsers().then(() => {
                console.log("ok...foi???");
            })
        },

        loadAreas() {
            let self = this
            //console.log(this.uuidv4());
            let model = cb("salamais").coll("areas")
            console.log(model);
            return
            async function addAreas() {
                for (let idx in areas) {
                    let { nome, cor, icon, id, sigla } = areas[idx]
                    //console.log(nome);
                    let area = {
                        id, nome, cor, icon, id, sigla
                    }
                    await model.push(area)
                }
            }
            addAreas().then(() => {
                console.log("ok...foi???");
            })
        }
    }
}
</script>
