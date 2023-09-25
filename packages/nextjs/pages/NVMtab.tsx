import React from "react";
import ActionButton from "../components/ActionButton";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const NVMtab: NextPage = () => {
  return (
    <>
      <MetaHeader title="NVM Token" />
      <div>{ActionButton("🔥 Burn NVM", "🔥 Burn", "burn", "NVMToken", false)}</div>
    </>
  );
};

export default NVMtab;
