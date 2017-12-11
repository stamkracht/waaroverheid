import React from 'react'

import '../styles/container.css'

class Container extends React.Component {

  render() {
    return (
      <div className={`${this.props.shadow ? 'c-container shadow' : 'c-container'}`}>
        {this.props.children}
      </div>
    )
  }
}

Container.defaultProps = {
  text: 'Default',
  icon: '',
  iconPosition: 'right',
  textAlign: 'center',
  shadow: false,
}

export default Container
