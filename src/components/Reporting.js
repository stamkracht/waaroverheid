import React from 'react'

import Icon from './Icon'

import '../styles/reporting.css'


class Reporting extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  renderReporting() {
    if ( this.state.active ) {
      return (
        <div className='c-dropdown'>
          <div className='c-dropdown--header'>
            <h3>Report this document</h3>
            <div onClick={this.toggleReporting}>
              <Icon icon='close' width='20' height='20'/>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='c-reporting' ref={node => { this.flagMenu = node }}>
        <button className='c-details--rating' onClick={this.toggleReporting}>
          <Icon icon='flag' width='20' height='20'/>
        </button>
        {this.renderReporting()}
      </div>
    )
  }
}

export default Reporting
