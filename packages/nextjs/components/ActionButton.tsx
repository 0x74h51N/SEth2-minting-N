import React, { useRef, useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { handleInputError } from "~~/utils/errorHandling";

const ActionButton = (
  buttonText: string,
  buttonText2: string,
  functionName: "mint" | "burn",
  contractName: "NNNToken" | "NVMToken",
  showAddressInput: boolean,
) => {
  const [addr, setAddr] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [amountB, setAmountB] = useState<string>("0");
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const amountInputRefB = useRef<HTMLInputElement | null>(null);

  const handleAddrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddr(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    showAddressInput ? setAmount(event.target.value) : setAmountB(event.target.value);
  };
  const { writeAsync: asyncMint } = useScaffoldContractWrite({
    contractName,
    functionName: "mint",
    args: [addr, BigInt(0)],
  });
  const { writeAsync: asyncBurn } = useScaffoldContractWrite({
    contractName,
    functionName: "burn",
    args: [BigInt(0)],
  });

  const handleButtonClick = async () => {
    console.log(`${functionName} ${contractName} Token!`);
    if (showAddressInput) {
      if (!/^0x[0-9a-fA-F]{40}$/.test(addr.trim())) {
        handleInputError(addressInputRef, "INVALID_ADDRESS");
        return;
      } else if (amount !== "" && amount !== "0") {
        handleInputError(amountInputRef, "AMOUNT_EMPTY");
        return;
      } else if (amount.includes(",")) {
        handleInputError(amountInputRef, "DECIMAL_SEPARATOR");
        return;
      }
    } else {
      if (amountB !== "" && amountB !== "0") {
        handleInputError(amountInputRefB, "AMOUNT_EMPTY");
        return;
      } else if (amountB.includes(",")) {
        handleInputError(amountInputRefB, "DECIMAL_SEPARATOR");
        return;
      }
    }
    const arg = parseEther(amount);
    const argB = parseEther(amountB);
    showAddressInput ? await asyncMint({ args: [addr, arg] }) : await asyncBurn({ args: [argB] });
  };

  return (
    <div className="mainWrapper">
      <div className="wrapper">
        <div id="title2" className="title">
          <p>{buttonText}</p>
        </div>
        <div className="mainDiv">
          {showAddressInput && (
            <>
              <p className="text">Address:</p>
              <input placeholder="Wallet Address" ref={addressInputRef} className="input" onChange={handleAddrChange} />
            </>
          )}
          <p className="text">Amount:</p>
          <input
            placeholder={`${contractName === "NVMToken" ? "NVM" : "NNN"} Token Amount`}
            ref={showAddressInput ? amountInputRef : amountInputRefB}
            className="input"
            onChange={handleAmountChange}
          />
          <br />
          <button className="button" onClick={handleButtonClick}>
            {buttonText2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButton;
