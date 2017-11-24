import React from 'react'

import '../styles/container.css'

export default class Container extends React.Component {
  render() {
    return (
      <div className='c-container'>
        {this.props.children}
      </div>
    )
  }
}
