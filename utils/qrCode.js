const QRCode = require('qrcode')

const generateQR = async (url) => {
    const qrcode = await generateQRCodePromise(url)
    return qrcode;
}

const generateQRCodePromise = (url) => {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(url, (err, code) => {
            if(err) reject(err)
            resolve(code)
        })
    })
}

module.exports = {
    generateQR
}
