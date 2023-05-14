import { toast } from 'react-toastify';

const ToastSuccess = (messages)=> {
  toast.success(messages, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    theme: "light",
    });
}
const ToastError = (messages) => {
  toast.error(messages, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    });
}


export {
  ToastSuccess,
  ToastError
}
