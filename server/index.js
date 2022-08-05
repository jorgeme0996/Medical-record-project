const express = require('express');
const app = express();
const { getContract } = require('../interactions/MedicalRecord.interact')
const { generateQR } = require('../utils/qrCode');
app.use(express.json())

const router = express.Router();

router.get('/healthcheck', (req, res) => {
    // return challenge
    return res.json({
        ok: true
    });
});

router.post('/defender/webhook', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.json({
        ok: true
    })
});

router.post('/user', async (req, res) => {
    const { address } = req.body;
    try {
        const url = 'wwww.google.com'
        const contract = await getContract()
        const qr = await generateQR(url)
        let transaction = await contract.mint(address, qr)
        await transaction.wait();
        console.log("mined ", transaction.hash);
        res.json({
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
});

app.use('/med-rec', router)

app.listen(8080, () => console.log('Server is listening'));
