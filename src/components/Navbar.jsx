import React from "react";
import { createStyles, Header, Container, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10vh",
  },
  heading: {
    textAlign: "center",
  },
}));

export function Navbar() {
  const { classes } = useStyles();

  return (
    <Header height={56} mb={120}>
      <Container className={classes.inner}>
        <Title order={2} className={classes.heading}>
          COVID Dashboard
        </Title>
      </Container>
    </Header>
  );
}
