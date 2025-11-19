import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const toastSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      theme: "dark",
      autoClose: 1000,
      transition: Bounce,
    });
  };
  const toastError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      theme: "dark",
      autoClose: 1000,
      transition: Bounce,
    });
  };
  return { toastSuccess, toastError };
};

export default useToast;
