import React from 'react'

import { Route } from 'react-router-dom'
import Municipalities from './municipality-list';
import Map from './Map';

const App = () => (
    <div>
        <main>
            <Route path="/" component={Municipalities}/>
            <Route path="/:code" render={(props) => (
                <Map {...props}/>
            )}/>
        </main>
    </div>
)

export default App