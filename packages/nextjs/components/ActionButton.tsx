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
    <div className="mainWrapper">
      <div className="wrapper">
        <div id="title2" className="title">
          <p>{buttonText}</p>
        </div>
        <div className="mainDiv">
          {showAddressInput && (
            <>
              <p className="text">Address:</p>
              <input
                placeholder="Wallet Address"
                ref={addressInputRef}
                className="input"
                onKeyDown={handleKeyDown}
                onChange={handleAddrChange}
              />
            </>
          )}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan pulvinar lectus. Aenean dapibus,
            tortor nec feugiat feugiat, mauris magna dictum felis, ut semper nisl urna sit amet odio. Etiam sit amet
            ante ultricies, gravida ante nec, suscipit ipsum. Pellentesque non turpis vestibulum tortor facilisis dictum
            eget at tellus. Ut tempor vestibulum est, sed iaculis enim blandit nec. Sed suscipit nec libero nec
            vehicula. Praesent laoreet purus id ligula sagittis accumsan. Vestibulum erat tortor, ullamcorper eu lacus
            et, auctor facilisis tortor. Praesent a metus commodo, pretium diam ac, convallis diam. Etiam commodo lorem
            ut venenatis suscipit. Nunc finibus laoreet rhoncus. Nunc rutrum vel justo sagittis rhoncus. Nunc laoreet
            dignissim ipsum a condimentum. Etiam at leo eget massa placerat posuere nec et neque. Nam at mi ut eros
            luctus commodo. Nam quam urna, dapibus sed odio id, luctus dignissim est. Ut sagittis dolor justo, in
            placerat sapien rhoncus vel. Vivamus consectetur orci id arcu rutrum, nec tincidunt nulla facilisis.
            Pellentesque vitae blandit neque, sed condimentum neque. Donec maximus ultricies sagittis. In dictum neque
            ipsum, vel finibus sem auctor eu. Suspendisse et nisl ut dolor auctor suscipit nec ut ligula. Donec sagittis
            lacus tellus, vitae commodo nisi laoreet quis. In faucibus consequat maximus. Pellentesque laoreet eu lacus
            congue placerat. Cras rhoncus id neque sit amet aliquam. Phasellus ornare quam at ligula viverra, eu
            sagittis dui placerat. Proin convallis mollis ligula, ac pulvinar sapien viverra vitae. Donec pellentesque
            metus elit, at laoreet erat mattis quis. Maecenas ut dui id risus consectetur scelerisque. Integer non
            mauris ullamcorper, imperdiet eros sit amet, fringilla erat. Donec id tortor vel massa blandit molestie ut
            quis tortor. Praesent sed leo at enim porttitor bibendum sed vitae nisl. Suspendisse eget mollis ex. Integer
            porta felis vel dui hendrerit, id sagittis augue facilisis. Nam pellentesque mauris ac nisi finibus lacinia.
            Pellentesque aliquam dapibus convallis. Fusce dignissim maximus erat, non gravida odio tempus quis. Donec
            lobortis magna in erat varius, non posuere enim maximus. Morbi sed nibh sagittis, dictum velit vel, feugiat
            lorem. Praesent vitae eleifend sapien. Vestibulum aliquam, ipsum non venenatis scelerisque, sem nulla
            posuere lacus, vitae rhoncus velit risus et felis. Proin elit neque, vestibulum vel volutpat vitae, ornare
            ut libero. Curabitur faucibus dolor a nibh bibendum porttitor. Nullam ac nulla et nisl finibus accumsan
            dignissim sed sem. Aenean quis iaculis urna. Aenean efficitur justo vel augue malesuada condimentum. Nunc ac
            rutrum eros, quis eleifend orci. Curabitur luctus consectetur diam sed convallis. Suspendisse ut aliquet
            lorem. Cras venenatis ultrices libero ac volutpat. Integer vestibulum tempor egestas. Sed accumsan augue sed
            maximus scelerisque. Vestibulum ullamcorper, purus laoreet ultrices cursus, eros leo finibus massa, non
            malesuada ligula lacus sit amet augue. Curabitur magna nulla, rhoncus non nibh ut, iaculis hendrerit mauris.
            Fusce imperdiet ligula venenatis, placerat dolor in, dapibus ipsum. Vestibulum arcu velit, malesuada nec
            dictum eu, egestas ut lorem. Quisque iaculis iaculis turpis, ut gravida ex aliquam sit amet. Cras pharetra
            commodo ullamcorper. Ut ligula metus, luctus eu imperdiet vel, laoreet vel elit.
          </p>
          <p className="text">Amount:</p>
          <input
            placeholder={`${contractName === "NVMToken" ? "NVM" : "NNN"} Token Amount`}
            ref={showAddressInput ? amountInputRef : amountInputRefB}
            className="input"
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
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
