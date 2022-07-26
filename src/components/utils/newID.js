
export default function newID(prefix = "", len = 4) {
    let _nome = prefix.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
    return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ).substr(0, len);
}