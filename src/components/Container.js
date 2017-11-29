import React from 'react'

import '../styles/container.css'

class Container extends React.Component {
  
  render() {
    return (
      <div className='c-container'>
        {this.props.children}
      </div>
    )
  }
}

export default Container
