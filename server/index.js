const express = require('express');
const cors = require('cors');
const app = express();
const { getContract } = require('../interactions/MedicalRecord.interact')
const { validateEmail } = require('../utils/validEmail');
const { generateQR } = require('../utils/qrCode');
const connectDB = require('../config/db');
const { Port, Host } = require('../config/constants');
const User = require('../model/User');
const { contact } = require('../services/email.service')
const timeout = require('connect-timeout')
const path = require('path')

app.use(express.static(__dirname + "/public"));

app.use(express.json())

const router = express.Router();

app.use(timeout('3600s'))

//Cors
app.use(cors({origin: true, credentials: true}))

//Connect to database
connectDB();

router.get('/healthcheck', (req, res) => {
    // return challenge
    return res.json({
        ok: true
    });
});

app.get('/medrec/:id', async (req, res) => {
    res.sendFile('public/sample.pdf', {root: __dirname })
})

router.post('/defender/webhook', async (req, res) => {
    const addressReceiver = req.body.events[0].matchReasons[0].args[0]
    const base64Img = req.body.events[0].matchReasons[0].args[1]
    const email = req.body.events[0].matchReasons[0].args[2]

    try {
        if(addressReceiver && base64Img && email) {
            const user = await User.findOne({email, accountAddress: addressReceiver})
            console.log(user.name, user.email, `www.fake-front.com/medrec/${user.id}`);
            if(user) {
                const emailStatus = await contact({name: user.name, email: user.email, url: `
                    www.fake-front.com/medrec/${user.id}
                `})
    
                if(emailStatus) {
                    console.log(emailStatus)
                }
            }
        }

    } catch (error) {
        console.log(error)
    }

    res.json({
        ok: true
    })
});

router.post('/user', async (req, res) => {
    const { address, email, name, lastName } = req.body;
    if(!validateEmail(email)) res.status(400).json({
        ok: false,
        msg: 'Invalid email'
    })
    try {
        const user = await User.create({
            accountAddress: address,
            email,
            name,
            lastName
        })
        await user.save()
        const url = `${Host}/medrec/${user.id}`
        const contract = await getContract()
        const qr = await generateQR(url)
        let transaction = await contract.mint(address, qr, email, url)
        await transaction.wait();
        res.json({
            ok: true,
            txrHash: transaction.hash
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
});

app.use('/med-rec', router)

app.listen(Port || 8080, () => console.log('Server is listening'));
