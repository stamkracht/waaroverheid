import React, { Component } from 'react'

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'
import SearchBox from './SearchBox'
import Tag from './Tag'

class Documents extends Component {

  constructor(props) {
    super(props)

    this.state = {
      update: false,
    }
  }

  renderDocumentItems() {
    return Array.apply(null, new Array(10)).map((e, i) => <DocumentItem key={i} fileTitle={`Document number ${i+1}`} />
    )
  }

  renderTags() {
    return this.props.service.filters.types.map((types, i) => {
      return types.items.map((item, i) => {
        if(item.active)
        return (
          <Tag key={i} text={item.name} onClick={ () => {
            item.active = !item.active;
            this.setState({update: !this.state.update})
            }
          } />
        )
      })
    })
  }

  render() {
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <div className='c-selectedFilters'>
            {this.renderTags()}
          </div>
          <SearchBox />
          <div className='c-documentList'>
            {this.renderDocumentItems()}
          </div>
        </div>
      </Container>
    </div>
    )
  }
}

Documents.defaultProps = {
  num: 0,
}

export default Documents
