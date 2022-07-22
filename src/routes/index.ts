import {Router, Request, Response} from "express";
import AuthController from "../controllers/AuthController";

const router = Router()

router
    .get("/", (req: Request, res: Response) => {
        res.send("fit app")
    })
    .post("/register", AuthController.registerFunc)
    .post("/email-verify", AuthController.emailVerification)
    .patch("/update-verification-code", AuthController.updateVerificationCode)

export default router