import {pgp} from "../../db";

const UserModel = {
    getOneUserByEmail: async (email: string) => {
        return pgp.as.format(`
            SELECT *
            FROM "users"
            WHERE email = $1
        `, [email])
    },

    getOneUserById: async (id: number) => {
        return pgp.as.format(`
            SELECT *
            FROM "users"
            WHERE id = $1
        `, [id])
    },

    createUser: async (first_name: string, last_name: string, email: string, password: string, verification_code: string) => {
        return pgp.as.format(`
            INSERT INTO "users"(first_name,last_name, email, password, email_verification_code, email_verification_expire_date)
            VALUES ($1, $2, $3, $4, $5, now() + INTERVAL '5 minutes')
            RETURNING id
        `, [first_name, last_name, email, password, verification_code])
    },

    userEmailVerification: async (id: number) => {
        return pgp.as.format(`
            UPDATE "users"
            SET "email_verified" = true
            ,"email_verification_code" = null
            ,"email_verification_expire_date" = null
            WHERE id = $1
        `, [id])
    },

    getVerificationCode: async (id: number) => {
        return pgp.as.format(`
            SELECT email_verification_code, now() > email_verification_expire_date as verification_expired
            FROM "users"
            WHERE id = $1
        `, [id])
    },

    updateVerificationCode: async (id: number, verification_code: string) => {
        return pgp.as.format(`
            UPDATE "users"
            SET "email_verification_code" = $1,
            "email_verification_expire_date" = now() + INTERVAL '5 minutes'
            WHERE id = $2
        `, [verification_code, id])
    },

    checkUserEmailVerified: async (id:number) => {
        return pgp.as.format(`
            SELECT email_verified
            FROM users
            WHERE id = $1
        `, [id])
    },

    setPasswordByEmail: async (email: string, password: string) => {
        return pgp.as.format(`
            UPDATE "users"
            SET "password" = $1
            WHERE email = $2
        `, [password, email])
    },

    getPasswordByEmail: async (email: string) => {
        return pgp.as.format(`
            SELECT password
            FROM "users"
            WHERE email = $1
        `, [email])
    }
}

export default UserModel