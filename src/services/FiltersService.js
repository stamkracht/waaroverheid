const FiltersService = (function () {

  let FILTERS = {
    start_date: null,
    classification: null,
  };

  let APPLIED_FILTERS = {};

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
    APPLIED_FILTERS = get();
    FILTERS = {
      start_date: null,
      classification: null,
    };
  }

  function getAppliedFilters() {
    return APPLIED_FILTERS;
  }

  return {
    set,
    get,
    reset
  };

}());

export default FiltersService
