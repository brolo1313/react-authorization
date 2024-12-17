import { toast, ToastOptions } from "react-toastify";

interface ToastProps {
  title?: string;
  message?: string;
  options?: ToastOptions;
}

const defaulteOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const optionsSuccess = {
  ...defaulteOptions,
  position: "top-center",
};

const optionsError = {
  ...defaulteOptions,
  position: "bottom-center",
};

export const ShowToasterError = ({
  title,
  message,
  options = optionsError as ToastOptions,
}: ToastProps) => {
  toast.error(
    <div>
      {title}
      <br /> {message}
    </div>,
    options
  );
};

export const ShowToasterSuccess = ({
  title = "Success",
  message,
  options = optionsSuccess as ToastOptions,
}: ToastProps) => {
  toast.success(
    <div>
      {title}
      <br /> {message}
    </div>,
    options
  );
};

export default [ShowToasterError, ShowToasterSuccess];
