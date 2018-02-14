import React from 'react';

import { Route } from 'react-router-dom';
import MunicipalitiesList from './MunicipalitiesList';
import Map from './Map';

const App = () => (
    <div>
        <Route path="/" component={MunicipalitiesList} />
        <Route path="/:code" component={Map} />
    </div>
);

export default App;
