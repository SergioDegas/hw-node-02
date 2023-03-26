import sgMail from "@sendgrid/mail";
import { API_KEY, EMAIL_ADDRESS } from process.env;

sgMail.setApiKey(API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  const email = {
    to,
    from: EMAIL_ADDRESS,
    subject,
    text,
  };

  await sgMail.send(email);

  return true;
};
export default sendEmail;