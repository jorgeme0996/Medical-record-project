require('dotenv').config()

const RPCUrl=process.env.RPC_URL
const PrivateKey=process.env.PIVATE_KEY
const PolygonScanApiKey=process.env.POLYGONSCAN_API_KEY
const DefenderKey=process.env.DEFENDER_KEY
const DefenderSecret=process.env.DEFENDER_SECRET
const AlquemyApiKey=process.env.ALQUEMY_API_KEY
const AddressContract=process.env.ADDRESS_CONTRACT
const MongoUrl=process.env.MONGO_URL
const Port=process.env.PORT
const Host=process.env.HOST
const SmtpMail=process.env.SMTP_MAIL
const SmtpHost=process.env.SMTP_HOST
const SmtpPassword=process.env.SMTP_PASSWORD
const SmtpPort=process.env.SMTP_PORT

module.exports = {
    SmtpPort,
    SmtpHost,
    SmtpMail,
    SmtpPassword,
    RPCUrl,
    PrivateKey,
    PolygonScanApiKey,
    DefenderKey,
    DefenderSecret,
    AlquemyApiKey,
    AddressContract,
    MongoUrl,
    Port,
    Host
}
