import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";
import ApexCharts from "apexcharts";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  const [statNames, setStatNames] = useState();
  const [statNums, setStatNums] = useState();

  useEffect(() => {
    populateArrays();
  }, []);

  useEffect(() => {
    console.log("Updated statNums:", statNums);
  }, [statNums]);

  useEffect(() => {
    console.log("Updated statNames:", statNames);
  }, [statNames]);

  function populateArrays() {
    const statNumArrToPopulate = [];
    const statNameArrToPopulate = [];
    pokemon.stats?.map((item) => {
      statNumArrToPopulate.push(item.base_stat);
      statNameArrToPopulate.push(item.stat.name);
    });
    setStatNames(statNameArrToPopulate);
    setStatNums(statNumArrToPopulate);
    console.log("StatNumArr:", statNums);
    console.log("StatNumArr:", statNames);
  }

  return (
    <>
      <h1>Pokemon Stats</h1>
    </>
  );
};
