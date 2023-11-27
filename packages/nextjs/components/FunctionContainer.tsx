import React, { useRef, useState } from "react";
import { parseEther } from "viem";
import { useNetwork } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { handleInputError } from "~~/utils/errorHandling";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const FunctionContainer = (
  title: string,
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

  const { chain } = useNetwork();
  const writeDisabled = !chain || chain?.id !== getTargetNetwork().id;

  const handleAddrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputError(addressInputRef, undefined, false);
    setAddr(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputError(showAddressInput ? amountInputRef : amountInputRefB, undefined, false);
    showAddressInput ? setAmount(event.target.value) : setAmountB(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
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
        return handleInputError(addressInputRef, "INVALID_ADDRESS");
      } else if (amount == "" || amount == "0") {
        return handleInputError(amountInputRef, "AMOUNT_EMPTY");
      } else if (amount.includes(",")) {
        return handleInputError(amountInputRef, "DECIMAL_SEPARATOR");
      }
    } else {
      if (amountB == "" || amountB == "0") {
        return handleInputError(amountInputRefB, "AMOUNT_EMPTY");
      } else if (amountB.includes(",")) {
        return handleInputError(amountInputRefB, "DECIMAL_SEPARATOR");
      }
    }
    const arg = parseEther(amount);
    const argB = parseEther(amountB);
    showAddressInput ? await asyncMint({ args: [addr, arg] }) : await asyncBurn({ args: [argB] });
  };

  return (
    <>
      <div className="flex flex-col pt-20 justify-center items-center w-full h-auto px-8">
        <div className="flex flex-col relative w-[35svw] min-w-[500px] max-sm:min-w-[350px] max-sm:w-full items-center justify-center">
          <div className="flex h-[5rem] w-[14rem] max-xl:w-[10rem] pr-1 bg-base-300 absolute self-start rounded-[22px] -top-[45px] -left-[1px] shadow-lg shadow-base-300">
            <p className="antialiased font-bold text-2xl max-xl:text-lg bold m-2 text-center w-full">{title}</p>
          </div>
          <div className="relative w-full z-10 p-5 divide-y bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300">
            <div className="flex flex-col gap-6">
              <div>
                {showAddressInput && (
                  <>
                    <p className="text my-1">Address:</p>
                    <div>
                      <div className="flex min-h-[3.2rem] border-2 border-base-200 bg-base-200 rounded-2xl text-accent">
                        <input
                          placeholder="Wallet Address"
                          ref={addressInputRef}
                          className="input input-ghost focus:bg-transparent focus:text-gray-400 h-[3rem] min-h-[3rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-500 rounded-2xl"
                          onKeyDown={handleKeyDown}
                          onChange={handleAddrChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <p className="text my-1">Amount:</p>
                <div className="flex min-h-[3.2rem] border-2 border-base-200 bg-base-200 rounded-2xl text-accent">
                  <input
                    placeholder={`${contractName === "NVMToken" ? "NVM" : "NNN"} Token Amount`}
                    ref={showAddressInput ? amountInputRef : amountInputRefB}
                    className="input input-ghost focus:bg-transparent focus:text-gray-400  h-[3rem] min-h-[3rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 rounded-2xl"
                    onChange={handleAmountChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end border-none mt-4">
              <button
                className="btn btn-secondary btn-sm rounded-xl w-[110px] h-[40px]"
                disabled={writeDisabled}
                onClick={handleButtonClick}
              >
                {buttonText2}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionContainer;
