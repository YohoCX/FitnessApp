import {DatabaseClient, ServiceProps} from "../types";
import {ExtendedDatabase} from "../db";
import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Errors from "../modules/errors";
import {randomSixDigit} from "../modules/helpers";
// import transporter from "../modules/helpers/nodemailer";


export default class AuthService {
    private db: ExtendedDatabase = null;
    private pgp: DatabaseClient = null;

    constructor(props: ServiceProps) {
        this.db = props.db;
        this.pgp = props.pgp;
    }

    loginUser = async (email: string, password: string) => {
        try {
            if (!await this.db.user.service.getOneUserByEmail(email)) {
                Errors.userNotExist();
            }

            const user = await this.db.user.service.getOneUserByEmail(email);

            console.log(user)

            if (await bcrypt.compare(user.password, password)) {
                Errors.userNotExist();
            }

            let token = jwt.sign({id: user.id}, config.session_secret);

            await this.db.oneOrNone(await this.db.auth.query.createSession(user.id, token));

            return {token};

        } catch (e) {
            return e;
        }
    };

    registerUser = async (first_name: string, last_name: string, email: string, password: string) => {
        try {
            return await this.db.tx(async transaction => {
                const theUser = await transaction.oneOrNone(
                    await transaction.user.query.getOneUserByEmail(email)
                )

                if (theUser) {
                    Errors.emailAlreadyExist();
                }

                let verificationCode = randomSixDigit()

                // await transporter.sendMail({
                //     from: 'fazliddinodinson@gmail.com',
                //     to: email,
                //     subject: 'Email Verification',
                //     text: 'Your verification code is ' + verificationCode,
                // })

                const user = await transaction.user.service.createUser(first_name, last_name, email, await bcrypt.hash(password, config.salt_round), verificationCode);

                return user.id;
            });
        } catch (e) {
            return e;
        }
    };

    emailVerification = async (id: number, verificationCode: string) => {
        try {
            return await this.db.tx(async transaction => {
                const theVerificationCode = await transaction.oneOrNone(
                    await transaction.user.query.getVerificationCode(id)
                )

                console.log(theVerificationCode)

                if (!theVerificationCode) {
                    Errors.userNotExist()
                }

                if (theVerificationCode.verification_expired) {
                    Errors.verificationCodeExpired()
                }

                if (theVerificationCode.email_verification_code != verificationCode) {
                    Errors.verificationCodeDontMatch()
                }

                await transaction.oneOrNone(await transaction.user.query.userEmailVerification(id))

                let token = jwt.sign({id: id}, config.session_secret);

                console.log(token)

                await transaction.oneOrNone(await transaction.auth.query.createSession(id, token));

                return {token};

            })
        } catch (e) {
            return e
        }
    }

    updateVerificationCode = async (id: number) => {
        try {
            return await this.db.tx(async transaction => {
                if (!await transaction.oneOrNone(await transaction.user.query.getOneUserById(id))) {
                    Errors.userNotExist()
                }

                const userVerified = await transaction.one(await transaction.user.query.checkUserEmailVerified(id))

                if (userVerified.email_verified) {
                    Errors.userAlreadyVerified()
                }

                const verificationCode = randomSixDigit()

                await transaction.oneOrNone(await transaction.user.query.updateVerificationCode(id, verificationCode))

                return null
            })
        } catch (e) {
            return e
        }
    }

    logOut = async (id: number, token: string) => {
        try {
            return await this.db.tx(async transaction => {

            })
        } catch (e) {
            return (e)
        }
    }
}