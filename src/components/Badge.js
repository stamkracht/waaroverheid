import React from 'react'

import '../styles/badge.css'

const Badge = ({active, num}) => {
  return (
    <div className={`${active ? 'c-badge active' : 'c-badge'}`}>
      {num}
    </div>
  )
}

Badge.defaultProps = {
  num: 0,
  active: false,
}

export default Badge
