import { Processor } from 'windicss/lib'
import { HTMLParser } from 'windicss/utils/parser'
import fs from 'fs';

let data = fs.readFileSync('./htmlemail/index.html',
    { encoding: 'utf8', flag: 'r' });
console.log(data);

function generateStyles(html) {
    // Get windi processor
    const processor = new Processor()

    // Parse all classes and put into one line to simplify operations
    const htmlClasses = new HTMLParser(html)
        .parseClasses()
        .map(i => i.result)
        .join(' ')

    // Generate preflight based on the HTML we input
    const preflightSheet = processor.preflight(html)

    // Process the HTML classes to an interpreted style sheet
    const interpretedSheet = processor.interpret(htmlClasses).styleSheet

    // Build styles
    const APPEND = false
    const MINIFY = false
    const styles = interpretedSheet.extend(preflightSheet, APPEND).build(MINIFY)

    return styles
}

data = data.replace('<script src="https://cdn.tailwindcss.com"></script>', '')
let ret = generateStyles(data)

let vet = data.split("</head>")
let saida = vet[0] + '<style>\n'+ret+'\n</style>' + vet[1];
let saidajs = 'export default `'+saida+'`';

fs.writeFileSync("./htmlemail/saida.html", saida);
fs.writeFileSync("./htmlemail/saida.js", saidajs);
//console.log(ret);