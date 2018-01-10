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

  getClassName() {
    if(this.props.hovering && this.props.disabled) {
        return 'c-button hovering disabled'
      }
    else if(this.props.hovering && !this.props.disabled) {
        return 'c-button hovering'
      }
    else if(!this.props.hovering && this.props.disabled) {
        return 'c-button disabled'
      }
    else {
        return 'c-button'
      }
    }

  render() {
    return (
      <Container shadow={this.props.shadow}>
        <div className={this.getClassName()} onClick={this.props.onClick}>

          {this.renderText()}

          <Icon icon={this.props.icon} iconPosition={this.props.iconPosition} pointRight={this.props.pointRight}/>
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
  shadow: true,
  hovering: true,
  onClick: undefined,
  disabled: false,
}

export default Button
