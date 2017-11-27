import React from 'react'

import '../styles/badge.css'

class Badge extends React.Component {
  render() {
    return  <div className='c-badge'>{this.props.num}</div>
  }
}

Badge.defaultProps = {
  num: 0,
}

export default Badge;
