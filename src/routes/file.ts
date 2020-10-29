import * as express from "express"
import * as argon from "argon2"
import jwt from "jsonwebtoken"
import multer from "multer"

import MongoClient, { Db } from "mongodb"

const file = express.Router()
const upload = multer({dest: 'uploads'})

file.post('/', upload.single('analytics'), async (req: express.Request, res: express.Response) => {
    // let credentials = {
    //     email: req.body.email,
    //     password: await argon.hash(req.body.password)
    // }

    console.log("File upload endpoint hit");

    console.log(req.body);
})

export default file;