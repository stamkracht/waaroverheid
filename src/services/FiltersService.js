const FiltersService = (function () {

  const BASE_FILTERS = {
    start_date: null,
    classification: null,
    types: {terms: ['events']}
  };
  let FILTERS = Object.assign({}, BASE_FILTERS);

  function set(filters) {
    FILTERS = Object.assign(FILTERS, filters);
    console.log(get())
  }

  function get() {
    return Object.keys(FILTERS)
      .filter(name => FILTERS[name])
      .reduce((memo, name) => {
        const filter = {};
        filter[name] = FILTERS[name];
        return Object.assign(memo, filter)
      }, {});
  }

  function reset() {
    FILTERS = Object.assign({}, BASE_FILTERS);
  }

  return {
    set,
    get,
    reset
  };

}());

export default FiltersService
