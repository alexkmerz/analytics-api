import * as express from "express"
import * as argon from "argon2"
import jwt from "jsonwebtoken"

import MongoClient, { Db } from "mongodb"

const auth = express.Router()

auth.post('/register', async (req: express.Request, res: express.Response) => {
    let credentials = {
        email: req.body.email,
        password: await argon.hash(req.body.password)
    }

    const url = process.env.DB_HOST || ''

    MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
        if (err) console.log(err)

        const analytics = client.db('analytics')

        let user = await analytics.collection('users').findOne({ email: credentials.email })
        if(user) {
            client.close()

            res.status(422)
                .send("This email has already registered")
        } else {
            await analytics.collection('users').insertOne(credentials, (err, res) => {
                if (err) console.log(err)
    
                client.close()
            })

            res.send("Registration complete")
        }
    })
})

auth.post('/login', async (req: express.Request, res: express.Response) => {
    let credentials = {
        email: req.body.email,
        password: req.body.password
    }

    const url = process.env.DB_HOST || ''

    MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
        if (err) console.log(err)

        const analytics = client.db('analytics')

        let user = await analytics.collection('users').findOne({ email: credentials.email })

        if(user) {
            if(await argon.verify(user.password, credentials.password)) {
                client.close()

                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    email: user.email    
                }, 'shhhh')

                res.send(token)
            } else {
                client.close()

                res.status(401).send("Access denied")
            }
        } else {
            client.close()

            res.status(401).send("Access denied")
        }
    })
})

export default auth;