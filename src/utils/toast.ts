import Toast from "react-hot-toast"


const successStyles = {
    background: '#4CAF50',
    color: '#fff',
    borderRadius: '10px',
};

const errorStyles = {
    background: '#f44336',
    color: '#fff',
    borderRadius: '10px',
};

export const toastSuccess = (text:string): any => {
       
       Toast.success(text, { position: "bottom-center", style:successStyles} )
}

export const toastError = (text:string):void => {
    Toast.error(text, {position:"bottom-center", style:errorStyles})
}