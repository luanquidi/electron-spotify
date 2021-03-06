import React from "react";
import { Grid } from "semantic-ui-react";
import Routes from "../../routes/Routes";

//Components
import { BrowserRouter as Router } from "react-router-dom";
import MenuLeft from "../../components/MenuLeft/MenuLeft";
import TopBar from "../../components/TopBar/TopBar";

//Styles
import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
  const { user, setUser, setReloadApp } = props;

  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>

          <Grid.Column className="content" width={13}>
            <TopBar user={user} setUser={setUser} />
            <Routes user={user} setReloadApp={setReloadApp}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <h2>Reproductor</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
