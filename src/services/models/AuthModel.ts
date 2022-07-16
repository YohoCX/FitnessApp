

import { pgp } from "../../db";

const AuthModel = {
    createSession: async (user_id:number,token:string) => {
        return pgp.as.format(`
            INSERT INTO "user_session"(user_id, token)
            VALUES ($1, $2)
        `, [user_id, token])
    },
    deleteSession: async (user_id:number,token:string) =>{
        return pgp.as.format(`
            DELETE FROM "user_session"
            WHERE 
            user_id = $1 AND
            token = $2
        `,[user_id,token])
    },
    getSession: async (user_id:number) => {
        return pgp.as.format(`
        SELECT *
        FROM "user_session"
        WHERE user_id = $1
    `,[user_id])
    },
}

export default AuthModel