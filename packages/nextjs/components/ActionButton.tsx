import React, { useRef, useState } from "react";
import { parseEther } from "viem";
import { useNetwork } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { handleInputError } from "~~/utils/errorHandling";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const ActionButton = (
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
      <div className="flex flex-col py-8 lg:py-12 justify-center items-center">
        <div className={`grid lg:grid-cols-3 px-6 gap-4 lg:px-10 lg:gap-1 min-w-8x1 w-full max-w-8xl my-10`}>
          <div className="col-start-2 col-end-3 flex flex-col gap-5">
            <div className="z-10">
              <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-5 relative">
                <div className="h-[5rem] w-[20rem] bg-base-300 absolute self-start rounded-[22px] -top-[45px] -left-[1px] -z-10 py-[0.4rem] shadow-lg shadow-base-300">
                  <div className="flex items-center justify-center space-x-0">
                    <p className="antialiased font-bold my-0 text-2xl bold">{title}</p>
                  </div>
                </div>
                <div className="p-5 divide-y divide-base-300 static">
                  <div>
                    {showAddressInput && (
                      <>
                        <p className="text">Address:</p>
                        <div>
                          <div className="flex h-[3.2rem] min-h-[3.2rem] border-2 border-base-200 bg-base-200 rounded-full text-accent ">
                            <input
                              placeholder="Wallet Address"
                              ref={addressInputRef}
                              className="input input-ghost focus:bg-transparent focus:text-gray-400 h-[3rem] min-h-[3rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-500"
                              onKeyDown={handleKeyDown}
                              onChange={handleAddrChange}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text">Amount:</p>
                      <div className="flex h-[3.2rem] min-h-[3.2rem] border-2 border-base-200 bg-base-200 rounded-full text-accent">
                        <input
                          placeholder={`${contractName === "NVMToken" ? "NVM" : "NNN"} Token Amount`}
                          ref={showAddressInput ? amountInputRef : amountInputRefB}
                          className="input input-ghost focus:bg-transparent focus:text-gray-400  h-[3rem] min-h-[3rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                          onChange={handleAmountChange}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <br />
                      <button
                        className="btn btn-secondary btn-sm mr-4"
                        disabled={writeDisabled}
                        onClick={handleButtonClick}
                      >
                        {buttonText2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ActionButton;
