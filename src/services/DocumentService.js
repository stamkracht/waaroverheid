class DocumentService {

  constructor() {
    this.filters = {
      search: '',
      range: {
        min: 2,
        max: 10,
      },
      types: [],
    }

    this.getTypes()
  }

  setFilters(filters) {
    this.filters = filters
  }

  getTypes() {
    this.filters.types.push({
      name: 'Soorten',
      items: [{
        name: 'Type 1',
        active: true,
      }, {
        name: 'Type 2',
        active: false,
      }, {
        name: 'Type 3',
        active: false,
      }],
    })
    this.filters.types.push({
      name: 'Parties',
      items: [{
        name: 'Party 1',
        active: true,
      }, {
        name: 'Party 2',
        active: true,
      }, {
        name: 'Party 3',
        active: false,
      }],
    })
    this.filters.types.push({
      name: 'Spices',
      items: [{
        name: 'Baby',
        active: false,
      }, {
        name: 'Ginger',
        active: false,
      }, {
        name: 'Posh',
        active: false,
      }, {
        name: 'Scary',
        active: false,
      }, {
        name: 'Sporty',
        active: false,
      }],
    })
  }
}

export default DocumentService
