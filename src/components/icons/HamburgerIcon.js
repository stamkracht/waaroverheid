import React from 'react'

class HamburgerIcon extends React.Component {
  render() {
    return (
      <svg viewBox="0 0 30 30"
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path d='M0 5h25v4H0V5zm0 8h25v4H0v-4zm0 8h25v4H0v-4z' fillRule='evenodd' />
      </svg>
    )
  }
}

HamburgerIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default HamburgerIcon
