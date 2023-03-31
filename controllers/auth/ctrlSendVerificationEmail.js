import { UserModel } from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const { LOCAL_URL } = process.env;
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(401, "Email already verified");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${LOCAL_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const ctrlSendVerificationEmail = ctrlWrapper(sendVerificationEmail);
export default ctrlSendVerificationEmail;
