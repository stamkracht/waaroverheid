import React from 'react'

import Icon from './Icon'
import Button from './Button'
import ListItem from './ListItem'

import '../styles/reporting.css'


class Reporting extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      options: {
        'Invalid': false,
        'Incorrect': false,
        'Irrational': false,
        'Irrelevant': false,
        'Inappropriate': false,
        'All of the above': false,
      },
    }

    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside, false)
  }

  handleClickOutside(e) {
    if ( this.state.active && !this.dropdown.contains(e.target) ) {
      this.closeReporting()
    }
  }

  handleOnChange(option, checked) {
    this.setState({options: {...this.state.options, option: checked}})
  }

  openReporting() {
    this.setState({active: true})
  }

  closeReporting() {
    this.setState({active: false})
  }

  renderOptions() {
    return Object.keys(this.state.options).map((option, i) => {
      return (
        <ListItem
          key={i}
          id={`${option}-${i}`}
          label={option}
          badge={false}
          checked={this.state.options[option]}
          onChange={(checked) => this.handleOnChange(option, checked)} />
      )
    })
  }

  renderReporting() {
    if ( this.state.active ) {
      return (
        <div className='c-dropdown' ref={node => { this.dropdown = node }}>
          <div className='c-dropdown--header'>
            <h3>Report this document</h3>
            <div onClick={this.closeReporting.bind(this)}>
              <Icon icon='close' width='20' height='20'/>
            </div>
          </div>
          <div className='c-dropdown--select'>
            <ul>
              {this.renderOptions()}
            </ul>
          </div>
          <textarea placeholder='Other reason' />
          <div className='c-dropdown--footer'>
            <Button text='Submit' shadow={true} hovering={true} textAlign='center' disabled={true} />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='c-reporting'>
        <Button
          text=''
          icon='flag'
          shadow={false}
          hovering={false}
          onClick={this.openReporting.bind(this)} />
        {this.renderReporting()}
      </div>
    )
  }
}

Reporting.defaultProps = {
  label: 'this is a label',
  id: Math.round(Math.random()*1000),
}

export default Reporting
