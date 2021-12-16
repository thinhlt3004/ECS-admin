import React, { useEffect, useMemo, useState } from "react";
import { getReportChart } from "../../Api/index";
import Chart from 'react-apexcharts'

const ChartView = () => {
  const [stateMent, setState] = useState(null);
  const [value, setValue] = useState([]);
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
    useEffect(() => {
      if(value.length > 0) {
        setState({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: months.length > 0 ? months : [],
              labels: {
                style: {
                  fontSize: "14px",
                },
                text: "Month",
              },
            },
            yaxis: {
              // opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#247BA0",
              },
              labels: {
                style: {
                  colors: "#247BA0",
                },
              },
              title: {
                text: "Profit",
                style: {
                  fontSize: "18px",
                  color: "#247BA0",
                },
              },
            },
          },
          series: [
            {
              name: "Profit",
              type: 'line',
              data: value.length > 0 ? value : [],
            },
          ],
          stroke: {
            curve: "straight",
          },
        });
      }
    },[value, months])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReportChart();
        let result = res.data.map(({ totalProfit }) => totalProfit);
        setValue(result);        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {stateMent !== null && (
        <Chart
          options={stateMent.options}
          series={stateMent.series}
          type="line"
          // width="500"
          height="500"
          style={{
            width: "80%",
            fontSize: "14px",
            fontWeight: "bold !important",
          }}
        />
      )}
    </>
  );
};

export default ChartView;
