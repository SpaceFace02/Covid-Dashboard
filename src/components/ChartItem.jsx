import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { RevolvingDot } from "react-loader-spinner";
import { DatePicker } from "@mantine/dates";
import "../index.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const ChartItem = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2022-02-01T13:13:30Z"));
  const [labels, setLabels] = useState([
    "1st Feb",
    "2nd Feb",
    "3rd Feb",
    "4th Feb",
    "5th Feb",
    "6th Feb",
    "7th Feb",
    "8th Feb",
    "9th Feb",
    "10th Feb",
    "11th Feb",
    "12th Feb",
    "13th Feb",
    "14th Feb",
    "15th Feb",
  ]);

  //   Month and its index object
  const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(`${new Date(dt).getDate()} ${month[new Date(dt).getMonth() + 1]}`);
    }
    return arr;
  };

  useEffect(() => {
    try {
      const data = fetch(
        `https://opslyft-backend.herokuapp.com/coviddata/chartdata/${startDate.toISOString()}`
      );
      data
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          const newLabels = getDaysArray(
            dayjs(startDate).toDate(),
            dayjs(startDate).add(14, "day")
          );
          setLabels(newLabels);
        });
    } catch (err) {
      setStartDate(new Date("2022-02-01T13:13:30Z"));
    }
  }, [startDate]);

  return (
    <div>
      {data ? (
        <div
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <div className="date-group">
            <DatePicker
              placeholder="Select date"
              label="Starting Date"
              onChange={setStartDate}
              defaultValue={new Date("2022-02-01T13:13:30Z")}
              value={startDate}
              minDate={dayjs(new Date()).startOf("year").toDate()}
              maxDate={dayjs(new Date()).subtract(15, "days").toDate()}
            />
          </div>
          <Bar
            datasetIdKey="id"
            data={{
              labels: labels,
              datasets: [
                {
                  id: 1,
                  label: "Active",
                  data: data.slice(0, 15).map((item) => item["Confirmed"]),
                  backgroundColor: "#00FF00",
                },
                {
                  id: 2,
                  label: "Deceased",
                  data: data.slice(0, 15).map((item) => item["Deaths"]),
                  backgroundColor: "#0000FF",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "COVID Dashboard",
                },
              },
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="loading-chart">
          <RevolvingDot color="#5566ff" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default ChartItem;
