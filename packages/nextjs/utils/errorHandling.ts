// errorHandling.ts
import { notification } from "~~/utils/scaffold-eth";

const ERROR_MESSAGES = {
  INVALID_ADDRESS: "Please enter a valid address.",
  AMOUNT_EMPTY: "Amount field cannot be empty.",
  DECIMAL_SEPARATOR: 'Use dot "." for decimal separator.',
};
const ERROR_RESET_DELAY = 2000;
export const handleInputError = (
  inputRef: React.RefObject<HTMLInputElement> | null,
  errorKey?: keyof typeof ERROR_MESSAGES,
) => {
  if (errorKey) {
    const errorMessage = ERROR_MESSAGES[errorKey];
    notification.error(errorMessage);

    if (inputRef && inputRef.current) {
      const currentInput = inputRef.current;
      currentInput.focus();
      currentInput.classList.add("red-border");

      setTimeout(() => {
        if (currentInput) {
          currentInput.classList.remove("red-border");
        }
      }, ERROR_RESET_DELAY);
    }
  }
};
