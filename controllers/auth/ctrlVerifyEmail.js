import { UserModel } from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    user.verificationToken = null;
    user.verify = true;
    await user.save();
    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
const ctrlVerifyEmail = ctrlWrapper(verifyEmail)
export default ctrlVerifyEmail
