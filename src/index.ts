import express from "express"
import cors from "cors"
import parser from "body-parser"
import dotenv from "dotenv"

import auth from "./routes/auth"
import file from "./routes/file"

const port = 4000
const app = express()

const mongo = process.env.DB_HOST || ''

dotenv.config()

app.use(cors())
app.use(parser.json())

app.use('/auth', auth)
app.use('/file', file)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})