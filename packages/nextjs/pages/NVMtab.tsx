import React from "react";
import FunctionContainer from "../components/FunctionContainer";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const NVMtab: NextPage = () => {
  return (
    <>
      <MetaHeader title="NVM Token" />
      <div>{FunctionContainer("🔥 Burn NVM", "🔥 Burn", "burn", "NVMToken", false)}</div>
    </>
  );
};

export default NVMtab;
