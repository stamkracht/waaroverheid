import React from 'react'

import Container from './Container'
import Icon from './Icon'
import '../styles/button.css'

class Button extends React.Component {

  renderText() {
    if(this.props.text) {
      return (
        <div className={`c-button--text ${this.props.textAlign}`}>
          {this.props.text}
        </div>
      )
    }
  }

  render() {
    return (
      <Container shadow={this.props.shadow}>
        <div className='c-button'>

          {this.renderText()}

          <Icon icon={this.props.icon} iconPosition={this.props.iconPosition} />

        </div>
      </Container>
    )
  }
}

Button.defaultProps = {
  text: 'Button',
  icon: '',
  iconPosition: 'right',
  textAlign: 'center',
}

export default Button
