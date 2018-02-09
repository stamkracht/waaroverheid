import React from 'react'

import Documents from './Documents'
import Icon from './Icon'
import { classNames } from '../utilities/class'

import '../styles/drawer.css'


class Drawer extends React.Component {
  constructor(props) {
    super (props)

    this.state = {
      animateDrawer: false
    }
  }

  componentWillReceiveProps({documentsCount}) {
    if(documentsCount && !this.props.isDrawerOpen && this.props.documentsCount !== documentsCount) {
      this.setState({animateDrawer: true})
      setTimeout(() => {
        this.setState({animateDrawer: false})
      }, 5000);
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      animateDrawer: false
    }
  }

  componentWillReceiveProps({documentsCount}) {
    if(documentsCount) {
      this.setState({animateDrawer: true})
      setTimeout(() => {
        this.setState({animateDrawer: false})
      }, 5000);
    }
  }

  handleOnClick() {
    this.props.toggleDrawer(this.props.isDrawerOpen)
  }

  renderHeaderContent() {
    let text = `${this.props.documentsCount} document${this.props.documentsCount === 1 ? '' : 'en'} gevonden in ${this.props.area}`
    if ( !this.props.active ) {
      return (
        <div>
          <Icon icon='file' iconPosition='left' />
          <span className='c-drawer--text'>
            {text}
          </span>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className='c-drawer--title'>
            {text}
          </h1>
        </div>
      )
    }
  }

  renderHamburger() {
    return (
      <div className={classNames('c-hamburger', {'active': this.props.isDrawerOpen})}>
        <span className='line' />
        <span className='line' />
        <span className='line' />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className='c-drawer--header' onClick={this.handleOnClick.bind(this)}>
        {this.renderHeaderContent()}
        {this.renderHamburger()}
      </div>
    )
  }

  renderDocuments = () => {
    if(this.props.isDrawerOpen) {
      if(this.props.documentsCount === 0) {
        return (
          <div className='c-emptyContent'>
            <h2>Geen documenten gevonden</h2>
            <ul>
            <li><h3>Probeer een andere gemeente of wijk</h3></li>
            <li><h3>Meld u aan voor meldingen</h3></li>
            </ul>
          </div>
        )
      }
      else {
        return <Documents
          documentsCount={this.props.documentsCount}
          facets={this.props.facets}
          documents={this.props.documents}
          filters={this.props.filters}
          getMoreDocuments={this.props.getMoreDocuments}
          hasMoreDocs={this.props.hasMoreDocs}
          removeFilters={this.props.removeFilters}
          resetQuery={this.props.resetQuery}
          query={this.props.query}/>
      }
    }
  }

  render() {
    return (
      <div className={classNames('c-drawer', {'active': this.props.isDrawerOpen, 'c-drawer--animate': this.state.animateDrawer})}>
        {this.renderHeader()}

        {this.renderDocuments()}
      </div>
    )
  }
}

Drawer.defaultProps = {
  isDrawerOpen: false,
  documentsCount: 0,
  area: 'geselecteerd gebied',
  toggle: undefined,
  service: {},
  documents: [],
  facets: {
    classification: { buckets: [] }
  },
  filters: {},
  updateFilters: () => {},
  getMoreDocuments: () => {},
  resetQuery: () => {},
}

export default Drawer
