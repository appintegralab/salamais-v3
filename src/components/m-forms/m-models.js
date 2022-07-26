import { setLocale, object, string, number } from 'yup';
import { pt } from 'yup-locale-pt';
setLocale(pt)
setLocale({
    mixed: {
        notType: ({
            type,
            value,
            originalValue
          }) => {
            const isCast = originalValue != null && originalValue !== value;
            let tipos = {
                'number': "numérico"
            }
            let msg = `deve ser do tipo ${tipos[type]}` 
            return msg;
          },
    }
});

const Model = {

    fields: {},

    schema: {},

    validate() {
        let elem = {}
        for (let key in Model.fields) {
            elem[key] = Model.fields[key].value
        }
        //console.log("elem", elem);
        let errors = false
        let parse = {}
        try {
            Model.schema.validateSync(elem)
            parse = Model.schema.cast(elem)
        } catch (e) {
            //console.dir(e);
            errors = { errors: JSON.parse(JSON.stringify(e)) }
            parse = errors.errors.value
        }
        return { data: parse, errors }
    },

    init(fields = {}) {

        Model.fields = fields
        let _schema = {}
        for (let key in Model.fields) {
            _schema[key] = Model.fields[key].yupRules
            const rule = Model.fields[key].yupRules
            Model.fields[key].isValid = (value) => {
                return rule.isValidSync(value)
            }
        }
        Model.schema = object(_schema)

        console.log("fields", Model.fields);
        console.log("schema", Model.schema);

        return Model
    },

    setValues(data) {

        for (let key in data) {
            Model.fields[key].value = data[key]
        }

    },

    reset() {

        for (let key in Model.fields) {
            Model.fields[key].value = Model.fields[key].default
        }

    }

}

export { Model, string, number }