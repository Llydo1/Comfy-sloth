import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    //1. Sidebar switch
    case LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };

    //2. Set view
    case SET_GRIDVIEW:
      return { ...state };
    case SET_LISTVIEW:
      return { ...state };

    //3. Sort
    case UPDATE_SORT:
      return { ...state };
    case SORT_PRODUCTS:
      return { ...state };

    //4. filter
    case UPDATE_FILTERS:
      return { ...state };
    case FILTER_PRODUCTS:
      return { ...state };
    case CLEAR_FILTERS:
      return { ...state };

    //5. default
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
