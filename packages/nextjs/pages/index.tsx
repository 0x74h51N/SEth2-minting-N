import React from "react";
import NNNtab from "./NNNtab";
import { MetaHeader } from "~~/components/MetaHeader";

const HomePage = () => {
  return (
    <>
      <MetaHeader title="NNN Token" />
      <div>
        <NNNtab />
      </div>
    </>
  );
};
export default HomePage;
