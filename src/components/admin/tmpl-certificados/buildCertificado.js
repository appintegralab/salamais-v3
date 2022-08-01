import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { jsPDF } from "jspdf"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./pdfmake-font";
pdfMake.vfs = pdfFonts;

function getDataUri(url, cb) {
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        //next three lines for white background in case png has a transparent background
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';  /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext('2d').drawImage(this, 0, 0);

        cb(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
}

function makeCertificadoPDF2(modelo, data) {

    //console.log(pdfMake);
    let dd = {
        pageOrientation: 'landscape',
        background: function (page) {
            return [{ image: 'bee', width: 840, height: 600 }];
        },
        content: [],
        images: { bee: modelo.urlImage }
    }

    dd.content.push('\n\n\n\n\n\n\n\n\n\n\n')
    let text = []
    let fontSize = 18
    for (let i in modelo.contents) {
        let node = modelo.contents[i]
        if (node.type == 'edit') {
            text.push({ text: node.value + " ", fontSize })
        }
        if (node.type == 'mention') {
            let val = data[node.item.value]
            text.push({ text: val + " ", fontSize, bold: true })
        }
    }
    console.log("text", text);

    dd.content.push({
        text,
        alignment: 'justify',
        margin: [50, 0]
    })

    dd.content.push('\n\n')

    let textData = "São Paulo, " + moment().format("DD")
    textData = textData + " de " + moment().locale('pt-br').format("MMMM")
    textData = textData + " de " + moment().format("YYYY")
    dd.content.push({
        text: textData,
        fontSize, alignment: 'right',
        margin: [50, 0]
    })

    pdfMake.createPdf(dd).download()
}

function makeCertificadoPDF(modelo, data) {
    let self = this
    console.log("makeCertificadoPDF");

    let text = ""
    for (let i in modelo.contents) {
        let node = modelo.contents[i]
        if (node.type == 'edit') {
            text = text + node.value + " "
        }
        if (node.type == 'mention') {
            let val = data[node.item.value]
            text = text + val + " "
        }
    }
    console.log("text", text);

    let certImagePath = modelo.urlImage
    getDataUri(certImagePath, function (dataUri) {
        let imageData = dataUri;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: 'mm',
        });

        doc.addImage(imageData, 'PNG', 0, 0, 297, 210);
        doc.text(text, 40, 80, { maxWidth: 220, align: "left" });

        doc.text("São Paulo, ", 40, 120, { maxWidth: 220, align: "left" });
        doc.html('Paranyan <b>loves</b> jsPDF', () => { })
        doc.save("salamais-certificado-" + moment().format('YYYY-MM-DD-hh-mm-ss') + ".pdf");
    });
}

export default function buildCertificado(modeloID, data = {}) {

    //let doc = new PDFDocument

    get(rdbref("/modelosCertificados/" + modeloID)).then((snap) => {
        let modelo = snap.val()
        console.log("modelo", modelo);
        makeCertificadoPDF2(modelo, data)
    })

}