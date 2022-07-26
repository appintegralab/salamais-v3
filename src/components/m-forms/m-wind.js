
const mw = function (classes) {
    const obj = {
        clsNames: {},
        cls(items) {
            let remNames = {}
            if (typeof (items) == 'object') {
                for (let key in items) {
                    if (items[key] == false) {
                        remNames[key] = true
                    }
                }
            }
            let output = ""
            for (let key in obj.clsNames) {
                if (remNames[key] == undefined) {
                    output = output + key + " "
                }
            }
            return output
        },
    }

    if (classes) {
        let tks = classes.split(" ")
        for (let i in tks) {
            obj.clsNames[tks[i]] = {
                name: tks[i],
                clsNames: {}
            }
        }
    }

    return obj.cls
}

export default mw