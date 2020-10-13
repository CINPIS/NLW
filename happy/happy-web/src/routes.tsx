import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
/* npm install @types/react-router-dom */

import Landing from './pages/Landing';
import OphanagesMaps from './pages/OrphanagesMaps';
import OrphanagesMaps from './pages/OrphanagesMaps';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/app" component={OrphanagesMaps} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;