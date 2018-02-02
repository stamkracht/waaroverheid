import React from 'react'

import { Route } from 'react-router-dom'
import MunicipalitiesList from './MunicipalitiesList';
import Map from './Map';

const App = () => (
    <div>
        <main>
            <Route path="/" component={MunicipalitiesList}/>
            <Route path="/:code" render={(props) => (
                <Map {...props}/>
            )}/>
        </main>
    </div>
)

export default App