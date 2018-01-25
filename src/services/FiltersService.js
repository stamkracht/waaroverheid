const FiltersService = (function () {

  let FILTERS = {
    start_date: null,
    classification: null,
    types: null
  };

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
    FILTERS = {
      start_date: null,
      classification: null,
      types: null
    };  
  }

  return {
    set,
    get,
    reset
  };

}());

export default FiltersService
