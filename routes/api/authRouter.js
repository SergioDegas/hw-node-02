import express from "express";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { registerSchema, loginSchema, emailSchema } from "../../schemas/user.js";
import {
  ctrlLogin,
  ctrlCurrentUser,
  ctrlLogout,
  ctrlRegister,
  ctrlVerifyEmail,
  ctrlSendVerificationEmail,
  ctrlAvatar,
} from "../../controllers/auth/index.js";
import upload from "../../middlewares/upload.js";


const authRouter = express.Router();
authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlRegister,
  ctrlSendVerificationEmail
);
authRouter.post("/login", validateBody(loginSchema), ctrlLogin);
authRouter.post("/logout", authenticate, ctrlLogout);
authRouter.get("/current", authenticate, ctrlCurrentUser);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), ctrlAvatar);
authRouter.get("/verify/:verificationToken", ctrlVerifyEmail);
authRouter.post("/verify", validateBody(emailSchema), ctrlSendVerificationEmail);

export default authRouter;