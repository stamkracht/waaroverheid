import React from 'react'

import Icon from './Icon'
import Button from './Button'

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
      <div className='c-reporting'>
        <Button
          text=''
          icon='flag'
          shadow={false}
          hovering={false}
          onClick={this.openReporting.bind(this)} />
        {this.renderReporting()}
      </div>
    )
  }
}

export default Reporting
