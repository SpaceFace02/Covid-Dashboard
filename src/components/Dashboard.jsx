import { Title, createStyles, Button, Badge, Table } from "@mantine/core";
import React, { useState } from "react";
import Cards from "./Cards";
import ChartItem from "./ChartItem";
import CasesTable from "./CasesTable";
import "../index.css";

// Auth
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const useStyles = createStyles((theme) => ({
  parent: {
    margin: "2.5rem 2rem",
    color: "#3f3f3f",
    paddingBottom: "0.4rem",
    alignSelf: "baseline",
  },
}));

const Dashboard = ({ apiData }) => {
  const { classes } = useStyles();
  const [userName, setUsername] = useState(null);

  const handleLogin = () => {
    // Manage oauth login using firebase and google.
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      user.displayName ? setUsername(user.displayName) : setUsername(user.email);
    });
  };

  const handleLogout = () => {
    auth.signOut();
    setUsername(null);
  };

  return (
    <div>
      <div className="top">
        <Title order={1} align="center" className={classes.parent}>
          Global Cases
        </Title>
        {userName ? (
          <div>
            <Badge color="pink" size="lg" variant="light">
              {userName}
            </Badge>
            <Button
              color="violet"
              size="sm"
              variant="light"
              onClick={handleLogout}
              style={{ margin: "0rem 2rem" }}
              radius="lg"
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            size="md"
            onClick={handleLogin}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            OAuth Log In
          </Button>
        )}
      </div>

      {/* <DatePicker /> */}
      <Cards apiData={apiData} />
      <Title order={3} align="center" className={classes.parent}>
        Graph of Cases in India (15 days)
      </Title>
      <ChartItem />
      <CasesTable />
    </div>
  );
};

export default Dashboard;
