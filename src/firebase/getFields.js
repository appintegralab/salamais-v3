import { rdbref } from "@/firebase/firebase.js"
import { ref, get } from "firebase/database"

async function getFields(path, fields = []) {
    let proms = []
    for (let i in fields) {
        let key = fields[i]
        proms.push(new Promise((resolve, reject) => {
            get(rdbref(path + "/" + key)).then((snap) => {
                let elem = { key, value: snap.val() }
                resolve(elem);
            })
        }));
    }
    let results = await Promise.all(proms)
    let data = {}
    for (let i in results) {
        let res = results[i]
        //console.log("res",res);
        data[res.key] = res.value
    }
    return data
}

export default getFields