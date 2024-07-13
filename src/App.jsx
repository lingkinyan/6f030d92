import React, { useContext } from "react";
import ReactDOM from "react-dom";

import Grid from "@mui/material/Grid";
import Header from "./components/header/Header.jsx";
import ListCalls from "./components/calls/ListCalls.jsx";
import Footer from "./components/footer/Footer.jsx";
import CallProvider from "./providers/CallProvider.jsx";
import TabProvider from "./providers/TabProvider.jsx";

const App = () => {
  return (
    <CallProvider>
      <TabProvider>
        <Grid
          container
          direction="column"
          style={{
            width: 376,
            height: 666,
            zIndex: 100,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, .9)",
            padding: "5px 20px",
          }}
        >
          <Grid item xs={1}>
            <Header />
          </Grid>
          <Grid item my={1} flex="1" sx={{ overflowY: "scroll " }}>
            <ListCalls />
          </Grid>
          <Grid item xs={1}>
            <Footer />
          </Grid>
        </Grid>
      </TabProvider>
    </CallProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
