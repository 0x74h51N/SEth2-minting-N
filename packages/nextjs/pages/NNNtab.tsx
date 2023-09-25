import React from "react";
import ActionButton from "../components/ActionButton";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const NNNtab: NextPage = () => {
  return (
    <>
      <MetaHeader title="NNN Token" />
      <div>
        {ActionButton("💵 Mint NNN", "💵 Mint", "mint", "NNNToken", true)}
        {ActionButton("🔥 Burn NNN", "🔥 Burn", "burn", "NNNToken", false)}
      </div>
    </>
  );
};

export default NNNtab;
