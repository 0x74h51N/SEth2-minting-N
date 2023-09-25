import React, { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { throwError } from "~~/utils/scaffold-eth/throwError";

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
        throwError("addr", "Please enter a valid address.");
        return;
      } else if (amount === "" || amount === "0") {
        throwError("amount", "Amount field cannot be empty.");
        return;
      } else if (amount.includes(",")) {
        throwError("amount", 'Use dot "." for decimal separator.');
        return;
      }
    } else {
      if (amountB === "" || amountB === "0") {
        throwError("amountB", "Amount field cannot be empty.");
        return;
      } else if (amountB.includes(",")) {
        throwError("amountB", 'Use dot "." for decimal separator.');
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
              <input placeholder="Wallet Address" id="addr" className="input" onChange={handleAddrChange} />
            </>
          )}
          <p className="text">Amount:</p>
          <input
            placeholder={`${contractName === "NVMToken" ? "NVM" : "NNN"} Token Amount`}
            id={`${showAddressInput ? "amount" : "amountB"}`}
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
