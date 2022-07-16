import dotenv from "dotenv"
dotenv.config()

const config = {
    database: {
        port: Number(process.env.DATABASE_PORT),
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    port: Number(process.env.PORT),
    session_secret: process.env.SESSION_SECRET,
    salt_round: Number(process.env.SALT_ROUND)
}

export default config