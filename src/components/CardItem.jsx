import React from "react";
import { createStyles, Text, Card, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: "bold",
    lineHeight: 1,
    color: "white",
    fontSize: "2rem",
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: 1,
    color: "#e2e2e2",
    marginTop: "0.5rem",
  },

  cardStyle: {
    padding: "3rem",
    boxShadow: "5px 5px 50x rgba(95, 95, 95, 0.5)",
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },
}));

export function CardItem({ title, completed, total, stat, background }) {
  const { classes } = useStyles();
  const items = (
    <div key={stat.label} className={classes.cardStyle}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed" className={classes.lead}>
        {stat.label}
      </Text>
    </div>
  );

  return (
    <Card
      withBorder
      radius="md"
      style={{
        background: background,
        boxShadow: "5px 5px 50x rgba(95, 95, 95, 0.5)",
      }}
    >
      <div className={classes.inner}>
        <Text size="xl" className={classes.label}>
          {title}
        </Text>
        <div></div>
        <Group>{items}</Group>
      </div>
    </Card>
  );
}
