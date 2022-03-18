import React from "react";
import { CardItem } from "./CardItem";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  parent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const Cards = ({ apiData }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.parent}>
      <CardItem
        stat={{ label: "New Active", value: apiData["Global"]["NewConfirmed"] }}
        background="linear-gradient(to top, #9d50bb, #6e48aa)"
      />
      <CardItem
        stat={{ label: "Total Confirmed", value: apiData["Global"]["TotalConfirmed"] }}
        background="linear-gradient(to bottom, #24c6dc, #514a9d)"
      />
      <CardItem
        stat={{ label: "New Deaths", value: apiData["Global"]["NewDeaths"] }}
        background="linear-gradient(to right, #ec6f66, #f3a183)"
      />
    </div>
  );
};

export default Cards;
