import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { firstLetterUpperCase } from "./../../utils/helperFunctions";
import ReactApexChart from "react-apexcharts";

export const PokemonStats = () => {
  const { pokemon } = useOutletContext();

  const [statNames, setStatNames] = useState([]);
  const [statNums, setStatNums] = useState([]);

  const statColors = [
    "#4CAF50", // HP
    "#F44336", // Attack
    "#2196F3", // Defense
    "#9C27B0", // Special Attack
    "#FF9800", // Special Defense
    "#E91E63", // Speed
  ];

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

  const totalBaseStats = statNums.reduce((sum, stat) => sum + stat, 0);

  return (
    <div className="statsPageContainer">
      <h1 className="statsTitle">{firstLetterUpperCase(pokemon.name)} Stats</h1>
      {statNames.length > 0 && statNums.length > 0 && (
        <div className="chartCard">
          <ReactApexChart
            type="bar"
            width="100%"
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
              colors: statColors,
              grid: {
                padding: {
                  top: 0,
                  bottom: 0,
                },
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  distributed: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: statNames,
                labels: {
                  rotate: -20,
                },
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
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      height: 300,
                    },
                    xaxis: {
                      labels: {
                        rotate: -30,
                      },
                    },
                  },
                },
              ],
            }}
          />
        </div>
      )}
      <div className="totalStatsCard">
        <span className="totalStatsLabel">Total Base Stats</span>
        <span className="totalStatsValue">{totalBaseStats}</span>
      </div>
    </div>
  );
};
