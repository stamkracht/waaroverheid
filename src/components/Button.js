import React from 'react'

import Container from './Container'
import '../styles/button.css'

class Button extends React.Component {

  render() {
    return (
      <div className='c-button'>
        <Container
          text={this.props.text}
          textAlign={this.props.textAlign}
          icon={this.props.icon}
          iconPosition={this.props.iconPosition}
          shadow={this.props.shadow}
          />
      </div>
    )
  }
}

Button.defaultProps = {
  text: 'Button',
  icon: '',
  iconPosition: 'right',
  textAlign: 'center',
  shadow: true,
}

export default Button;
