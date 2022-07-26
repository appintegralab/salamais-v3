import { setLocale, object, string, number } from 'yup';
import { pt } from 'yup-locale-pt';
setLocale(pt)

const model = {

    fields: {
        nome: { 
            type: "text", name: "nome", 
            label: "Nome do aluno", holder: "Digite nome do aluno",
            yupRules: string().trim().required() 
        },
        idade: { 
            type: "text", name: "idade", 
            label: "Idade do aluno", holder: "Digite a idade do aluno", 
            yupRules: number().required().positive().integer(),
        },
        email: { 
            type: "text", name: "email", 
            label: "Email do aluno", holder: "Digite um email válido", 
            yupRules: string().required().email(),                 
        }
    },

    schema: {},

    validate(elem) {
        let errors = false
        let parse = {}
        try {            
            model.schema.validateSync(elem)
            parse = model.schema.cast(elem)
        } catch (e) {
            //console.dir(e);
            errors = { errors: JSON.parse(JSON.stringify(e)) }
            parse = errors.errors.value
        }
        return { data: parse, errors }
    },

    init() {

        let _schema = {}
        for(let key in model.fields) {
            _schema[key] = model.fields[key].yupRules
            const rule = model.fields[key].yupRules
            model.fields[key].isValid = (value) => {
                return rule.isValidSync(value)  
            }
        }
        model.schema = object(_schema)

        console.log("fields", model.fields);
        console.log("schema", model.schema);

        let item = {
            nome: 'Ana',
            idade: '10',
            email: "a2a@a.com"
        }

        let ret = model.validate(item)
        console.log("ret",ret);
        if(!ret.errors) {
            console.log("ok");
        } else {
            console.log("errors",ret.errors);
        }

        return model
    }

}

export default model