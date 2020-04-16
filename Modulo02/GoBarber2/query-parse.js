module.exports = function (req, res, next) {
  const { query } = req;
  const queryParameters = {};
  /* let pagingOptions = {
          page: parseNumber(query.page) || 0,
          limit: parseNumber(query.limit) || 100,
          lastId: parseNumber(query.lastId) || null
      }; */

  if (
    query.sort &&
    query.sortBy &&
    (query.sortBy.toLowerCase() == 'asc' ||
      query.sortBy.toLowerCase() == 'desc')
  ) {
    queryParameters.sort = {};
    const order = query.sortBy.toLowerCase() == 'asc' ? 1 : -1;
    queryParameters.sort[query.sort] = order;
  }
  delete query.sort;
  delete query.sortBy;

  for (const v in query) {
    // let value = parseOperator(query[v]);
    const value = query[v];
    if (value && value !== 'undefined') {
      queryParameters[v] = value;
    }
  }

  // delete queryParameters.page;
  //  delete queryParameters.limit;
  // delete queryParameters.lastId;

  req.queryParameters = queryParameters;
  // req.pagingOptions = pagingOptions;

  next();
};
