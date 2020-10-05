exports.ceaserCipherEncode = (str, key) => {
    let shift = key;
    let encode = '';
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if      (65 <= c && c <=  90) encode += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) encode += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
        else                          encode += str.charAt(i);  // Copy
    }
    return encode;

}

exports.ceaserCipherDecode = (str,key) => {
    let shift = (26 - key) % 26;
    let decode = '';
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if      (65 <= c && c <=  90) decode += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) decode += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
        else                          decode += str.charAt(i);  // Copy
    }
    return decode;
}