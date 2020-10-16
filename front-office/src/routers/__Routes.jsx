import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
  } from "react-router-dom";

import CasViole from 'views/CasViole';
import StructureAccompagnement from 'views/StructureAccompagnement';
import FormulaireVictime from 'views/FormulaireVictime';

const Routes = () => {
    return (
            <Switch>
                <Route exact path="/">
                    <CasViole/>
                </Route>
                <Route path="/structureAccompagnement">
                    <StructureAccompagnement/>
                </Route>
                <Route path="/formulaireVictime">
                    <FormulaireVictime/>
                </Route>
                {/* <Route path="/" component={CasViole} exact/>
                <Route  path="/structureAccompagnement" component={StructureAccompagnement}/>
                <Route  path="/casViole" component={CasViole}/>
                <Route path="/formulaireVictime" component={FormulaireVictime} /> */}
            </Switch>   

         );
}



 
export default Routes;


