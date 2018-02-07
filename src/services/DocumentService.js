class DocumentService {

  constructor() {
    this.filters = {
        start_date: {
          from: 2,
          to: 10,
        },
        types: [],
    }

    this.getTypes()
  }

  setFilters(filters) {
    this.filters = filters
  }

}

export default DocumentService
