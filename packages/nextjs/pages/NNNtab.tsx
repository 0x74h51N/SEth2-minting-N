import React from "react";
import FunctionContainer from "../components/FunctionContainer";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const NNNtab: NextPage = () => {
  return (
    <>
      <MetaHeader title="NNN Token" />
      <div>
        {FunctionContainer("💵 Mint NNN", "💵 Mint", "mint", "NNNToken", true)}
        {FunctionContainer("🔥 Burn NNN", "🔥 Burn", "burn", "NNNToken", false)}
      </div>
    </>
  );
};

export default NNNtab;
