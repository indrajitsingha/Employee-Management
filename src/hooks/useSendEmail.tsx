import emailjs from "emailjs-com";
import useToast from "./useTostNotification";
import type { FormValues } from "@/util/types";
const Emailjs_Service_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const Emailjs_Template_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const Emailjs_Public_Key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const useSendEmail = () => {
  const { toastSuccess } = useToast();
  const sendemail = (data: FormValues) => {
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      joiningDate: data.joiningDate,
    };
    emailjs
      .send(
        Emailjs_Service_ID,
        Emailjs_Template_ID,
        emailData,
        Emailjs_Public_Key
      )
      .then(() => toastSuccess("Email sent Successfully "))
      .catch((error) => console.log(error));
  };
  return { sendemail };
};

export default useSendEmail;
