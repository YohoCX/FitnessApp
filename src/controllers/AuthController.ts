import {NextFunction, Request, Response} from "express";
import db from "../db";


const AuthControllers = {
    loginFunc: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await db.auth.service.loginUser(req.body.username, req.body.password));
        } catch (e) {
            next(e);
        }
    },
    registerFunc: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await db.auth.service.registerUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password));
        } catch (e) {
            next(e);
        }
    },
    emailVerification: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await db.auth.service.emailVerification(req.body.id, req.body.verificationCode));
        } catch (e) {
            next(e)
        }
    },

    updateVerificationCode: async (req: Request, res: Response, next: NextFunction) =>{
        try {
            res.status(204).json(await db.auth.service.updateVerificationCode(req.body.id))
        }catch (e) {
            next(e)
        }
    }
};

export default AuthControllers;