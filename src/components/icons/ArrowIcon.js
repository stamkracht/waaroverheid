import React from 'react'

class ArrowIcon extends React.Component {
  render() {
    return (
      <svg
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path stroke='null' d='M21.15953 10.48748l-.93366-.93366-9.02497 9.02505-9.02507-9.02505-.93365.93366 9.95872 9.9587z' />
      </svg>
    )
  }
}

ArrowIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default ArrowIcon
