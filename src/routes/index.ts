import {Router, Request, Response} from "express";

const router = Router()

router
    .get("/", (req: Request, res: Response) => {
        res.send("check ur mom")
    })
    .post("/register",)

export default router