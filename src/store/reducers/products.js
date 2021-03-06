let initialState = {
  results: [],
  searchTerm: '',
  searchedProducts: [],
  sortBy: '',
  sortedProducts: [],
  mainProducts: {},
  suggestions: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'GETPRODUCTS':
    return { ...state, ...payload };
  case 'GETSEARCHEDPRODUCTS':
    return {
      ...state,
      searchTerm: payload.searchTerm,
      searchedProducts: payload.searchedProducts,
    };
  case 'GETCATEGORYSEARCHEDPRODUCTS':
    return {
      ...state,
      searchTerm: payload.searchTerm,
      searchedProducts: payload.searchedProducts,
    };

  case 'SORTPRODUCTS':
    console.log('sort', payload);
    let sortCondition = '';
    let sortBy = payload.sortBy;
    let sortPriceRange = payload.sortPriceRange;
    let sortRating = payload.sortRating;
    let sorted = [];
    let productList = [];
    if (state.searchedProducts) {
      productList = state.searchedProducts;
    } else {
      productList = state.results;
    }
    if (sortBy) {
      if (sortBy === 'price') {
        sortCondition = 'price';
        sorted = productList.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (sortBy === 'new') {
        sortCondition = 'new';
        sorted = productList.sort((a, b) =>
          a.Timestamp > b.Timestamp ? 1 : -1,
        );
      } else if (sortBy === 'top-ranked') {
        sortCondition = 'top-ranked';
        sorted = productList.sort((a, b) => (a.views > b.views ? 1 : -1));
      }
    }
    if (sortPriceRange) {
      sortCondition = 'priceRange';
      let min = sortPriceRange.split('-')[0];
      let max = sortPriceRange.split('-')[1];
      sorted = productList.filter(
        (product) => product.price < max && product.price > min,
      );
    }
    if (sortRating) {
      sortCondition = 'rating';
      sorted = productList.filter((product) => product.review === sortRating);
    }
    console.log('sorted', sorted);
    return { ...state, sortBy: sortCondition, sortedProducts: sorted };
  case 'GET MAIN PAGE PRODUCTS':
    state.mainProducts = payload;
    return { ...state };

  case 'GET SEARCH':
    return { ...state, ...payload };
  default:
    return state;
  }
};
