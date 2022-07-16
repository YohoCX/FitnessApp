import { pgp } from "../../db";

const UserBodyModel = {
    getUserStatsById: async (userId:number) =>{
        return pgp.as.format(`
            SELECT ALL
            FROM "user_body_stats"
            WHERE user_id = $1
        `,[userId])
    }
}