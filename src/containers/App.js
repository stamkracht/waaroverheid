import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Municipalities from './Municipalities';
import Map from './Map';

class App extends React.Component {
  render() {
    return (
    <Router>
      <div>
        <Route path="/" component={Municipalities}/>
        <Route path="/:municipality/:district?/:neighborhood?" component={Map}/>
      </div>
    </Router>
    )
  }
}

export default App
