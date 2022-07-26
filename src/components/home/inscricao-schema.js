
let schema = {
    "id": {
        "type": "String",
        "unique": true,
        "required": true,
        "dropDups": true
    },
    "formacaoID": {
        "type": "String"
    },
    "opcao": {
        "type": "Number"
    },
    "sala": {
        "type": "Number"
    },
    "userID": {
        "type": "String"
    },
    "userEmail": {
        "type": "String"
    }
}