import React from 'react'

import '../styles/container.css'

const Container = ({shadow, children}) => {
  return (
    <div className={`${shadow ? 'c-container shadow' : 'c-container'}`}>
      {children}
    </div>
  )
}

Container.defaultProps = {
  shadow: false  
}

export default Container
