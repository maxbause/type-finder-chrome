import * as React from "react";
import * as ReactDOM from "react-dom";
import FooterComponent from "./components/footer/FooterComponent";
import MainView from "./views/MainView";
import NavigationComponent from "./components/navigation/NavigationComponent";
import SettingsView from "./views/SettingsView";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import "./global.scss";


ReactDOM.render(
  <MemoryRouter>
    <div>
      <NavigationComponent />
        <Switch>
          <Route path="/" exact component={MainView} />
          <Route path="/settings" component={SettingsView} />
        </Switch>
      <FooterComponent />
    </div>
  </MemoryRouter>,
  document.getElementById("app")
);