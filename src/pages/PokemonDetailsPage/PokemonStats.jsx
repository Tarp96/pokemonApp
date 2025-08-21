import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";
import ReactApexChart from "react-apexcharts";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  const [statNames, setStatNames] = useState([]);
  const [statNums, setStatNums] = useState([]);

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
      statNameArrToPopulate.push(firstLetterUpperCase(item.stat.name));
    });
    setStatNames(statNameArrToPopulate);
    setStatNums(statNumArrToPopulate);
  }

  return (
    <div className="statsPageContainer">
      <h1 className="statsTitle">{firstLetterUpperCase(pokemon.name)} Stats</h1>
      {statNames.length > 0 && statNums.length > 0 && (
        <div className="chartCard">
          <ReactApexChart
            type="bar"
            width={800}
            height={400}
            series={[
              {
                name: "Stats",
                data: statNums,
              },
            ]}
            options={{
              chart: {
                type: "bar",
                height: 700,
              },
              grid: {
                padding: {
                  top: 0,
                  bottom: 0,
                },
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: statNames,
              },
              yaxis: {
                min: 0,
                max: 252,
                labels: {
                  style: {
                    fontSize: "14px",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
