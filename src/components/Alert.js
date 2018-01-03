import React from 'react'

import Button from './Button'

import '../styles/alert.css'


class Alert extends React.Component {

  render() {
    return (
      <div className='c-alert'>
        <Button shadow={true} text='Sign up for alerts' icon='mail' textAlign='left'/>
      </div>
    )
  }
}

export default Alert
