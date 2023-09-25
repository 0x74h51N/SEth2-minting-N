import { notification } from "~~/utils/scaffold-eth";

export const throwError = (fieldId: string, message: string) => {
  const inputElement = document.getElementById(fieldId);
  if (inputElement) {
    notification.error(message);
    inputElement.style.borderColor = "red";
    inputElement.style.borderWidth = "2px";
    setTimeout(() => {
      inputElement.style.borderColor = "";
      inputElement.style.borderWidth = "";
    }, 1500);
  }
};
