import { notification } from "~~/utils/scaffold-eth";

const ERROR_MESSAGES = {
  INVALID_ADDRESS: "Please enter a valid address.",
  AMOUNT_EMPTY: "Amount field cannot be empty.",
  DECIMAL_SEPARATOR: 'Use dot "." for decimal separator.',
};
export const handleInputError = (
  inputRef: React.RefObject<HTMLInputElement> | null,
  errorKey?: keyof typeof ERROR_MESSAGES,
  errorTrue = true,
) => {
  if (errorKey && errorTrue) {
    const errorMessage = ERROR_MESSAGES[errorKey];
    notification.error(errorMessage);

    if (inputRef && inputRef.current) {
      const currentInput = inputRef.current;
      currentInput.classList.add("red-border");
      currentInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        currentInput.focus();
      }, 500);
    }
  } else if (inputRef && inputRef.current) {
    const currentInput = inputRef.current;
    currentInput.classList.remove("red-border");
  }
};
