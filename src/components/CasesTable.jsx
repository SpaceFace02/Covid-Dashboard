import React, { useEffect, useState } from "react";
import { Table, Title, TextInput } from "@mantine/core";
import { RevolvingDot } from "react-loader-spinner";

const CasesTable = () => {
  const [tableData, setTableData] = useState(null);
  const [searchedTableData, setSearchedTableData] = useState(null);
  const [rows, setRows] = useState(null);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const apiData = fetch("https://opslyft-backend.herokuapp.com/coviddata");
    apiData
      .then((res) => res.json())
      .then((res) => {
        setTableData(
          res.data["Countries"]
            .sort((a, b) => (a["TotalConfirmed"] > b["TotalConfirmed"] ? -1 : 1))
            .slice(0, 10)
        );
        setSearchedTableData(res.data["Countries"]);
      });
  }, []);

  useEffect(() => {
    if (tableData != null) {
      setRows(
        tableData.map((element) => (
          <tr key={element["ID"]}>
            <td>{element["Country"]}</td>
            <td>{element["TotalConfirmed"]}</td>
            <td>{element["TotalDeaths"]}</td>
            <td>{element["NewConfirmed"]}</td>
            <td>{element["NewDeaths"]}</td>
          </tr>
        ))
      );
    }
  }, [tableData]);

  const updateTable = (enteredValue) => {
    setSearched(enteredValue);
    if (enteredValue === "") {
      setRows(
        tableData.map((element) => (
          <tr key={element["ID"]}>
            <td>{element["Country"]}</td>
            <td>{element["TotalConfirmed"]}</td>
            <td>{element["TotalDeaths"]}</td>
            <td>{element["NewConfirmed"]}</td>
            <td>{element["NewDeaths"]}</td>
          </tr>
        ))
      );
      return;
    }
    setRows(
      searchedTableData
        .filter((element) => {
          return element["Country"].toLowerCase().includes(searched.toLowerCase());
        })
        .map((element) => (
          <tr key={element["ID"]}>
            <td>{element["Country"]}</td>
            <td>{element["TotalConfirmed"]}</td>
            <td>{element["TotalDeaths"]}</td>
            <td>{element["NewConfirmed"]}</td>
            <td>{element["NewDeaths"]}</td>
          </tr>
        ))
    );
  };

  return (
    <div>
      <Title
        order={5}
        align="center"
        style={{ margin: "1.5rem 0rem", fontWeight: "lighter", fontSize: "1.2rem" }}
      >
        For some reason, the API returns 0 for recovered cases, so I'm excluding that from the app.
      </Title>
      <div className="text-wrapper">
        <TextInput
          placeholder="Enter country"
          label="Search Country"
          radius="md"
          required
          onChange={(e) => updateTable(e.currentTarget.value)}
          value={searched}
        />
      </div>
      {tableData ? (
        <Table style={{ marginBottom: "2rem" }}>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Total Confirmed</th>
              <th>Total Deaths</th>
              <th>New Confirmed</th>
              <th>New Deaths</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <div className="loading-chart">
          <RevolvingDot color="#5566ff" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default CasesTable;
