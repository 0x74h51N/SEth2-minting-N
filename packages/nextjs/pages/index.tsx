import React from "react";
import NNNtab from "./NNNtab";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader title="NNN Token" />
      <div>
        <NNNtab />
      </div>
    </>
  );
};
export default Home;
