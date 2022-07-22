import { DatabaseClient, ServiceProps } from "../types";
import { ExtendedDatabase } from "../db";
import Errors from "../modules/errors";
import { randomSixDigit } from "../modules/helpers";

export default class UserService {
    private db: ExtendedDatabase = null;
    private pgp: DatabaseClient = null;

    constructor(props: ServiceProps) {
        this.db = props.db;
        this.pgp = props.pgp;
    }

    createUser = async (first_name: string, last_name: string, email: string, password: string, verification_code: string) => {
        try {
            return this.db.oneOrNone(await this.db.user.query.createUser(first_name, last_name, email, password, verification_code));
        } catch (e) {
            throw e;
        }
    };

    getOneUserByEmail = async (email: string) => {
        try {
            return await this.db.oneOrNone(
                await this.db.user.query.getOneUserByEmail(email),
            );
        } catch (e) {
            throw e;
        }
    };

    updatePasswordById = async (email: string) => {
        if (!this.getOneUserByEmail) {
            Errors.userNotExist()
        }

        const verificationCode = randomSixDigit()


    }
}