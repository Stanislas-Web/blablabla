import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";

import SituationActuelle from "views/SituationActuelle";
import StructuresAccompagnement from "views/StructuresAccompagnement";
import SoumettreCas from "views/SoumettreCas";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SituationActuelle />
      </Route>
      <Route path="/structures">
        <StructuresAccompagnement />
      </Route>
      <Route path="/plaintes">
        <SoumettreCas />
      </Route>
    </Switch>
  );
};

export default Routes;
