import express from "express"
import cors from "cors"
import parser from "body-parser"
import dotenv from "dotenv"

import auth from "./routes/auth"

const port = 4000
const app = express()

dotenv.config()

app.use(cors())
app.use(parser.json())

app.use('/auth', auth)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})