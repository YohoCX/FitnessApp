import express from 'express'
import logger from 'morgan'
import {queryParser} from 'express-query-parser'
import routes from "./routes";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    queryParser({
        parseNull: true,
        parseBoolean: true,
        parseNumber: true,
        parseUndefined: true
    })
)

app.use(logger("dev"))

app.use("/", routes)

export default app