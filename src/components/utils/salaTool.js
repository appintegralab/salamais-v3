import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, set, get, onValue, query, orderByChild, equalTo } from "firebase/database"

const salaTool = {
    salaID: "noid",
    formacaoID: "noid",
    formacao: null,
    sala: null,
    encontro: null,
    area: null,
    encontroID: "noid",
    areaID: "noid",
    urlID: "noid",

    init(urlParamID, cbfunc) {
        if (urlParamID && urlParamID != undefined) {
            salaTool.urlID = urlParamID
            let [salaID, formacaoID, encontroID, areaID] = urlParamID.split(":")
            salaTool.areaID = areaID
            salaTool.encontroID = encontroID
            salaTool.formacaoID = formacaoID
            salaTool.salaID = salaID

            onValue(ref(rdb, "/salamais/formacoes/" + formacaoID), (snap) => {
                //console.log(snap.val());
                salaTool.formacao = snap.val()
                if (salaTool.formacao == null) {
                    return
                }
                //console.log("salaTool.formacao",salaTool.formacao);
                //self.sala = salaID
                salaTool.encontro = salaTool.formacao.encontros[salaTool.encontroID]
                if (salaTool.encontro == undefined) {
                    return
                }
                if (salaTool.areaID != null && salaTool.areaID != undefined && salaTool.areaID != "") {
                    salaTool.sala = salaTool.encontro.areas[salaTool.areaID].salas[salaTool.salaID]
                } else {
                    salaTool.sala = salaTool.encontro.salas[salaTool.salaID]
                }
                //console.log("salaTool.encontro", salaTool.encontro);
                //console.log("salaTool.sala", salaTool.sala);
                cbfunc(salaTool)
            })
        }
    },
    isFacilitador(userID) {
        if (salaTool.sala) {
            if (salaTool.sala.facilitadores) {
                if (salaTool.sala.facilitadores[userID] != undefined) {
                    return true
                }
            }
        }
        return false
    }
}

export default function() {
    return salaTool
}