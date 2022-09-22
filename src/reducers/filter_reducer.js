import {
  LOAD_PRODUCTS,
  SET_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../utils/actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    //1. Load Products
    case LOAD_PRODUCTS:
      const maxPrice = Math.max(...action.payload.map((p) => p.price));
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [
          ...action.payload.sort((a, b) => a.price - b.price),
        ],
        filters: { ...state.filters, price: maxPrice, max_price: maxPrice },
      };

    //2. Set view
    case SET_VIEW:
      return { ...state, grid_view: action.payload };

    //3. Sort
    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { filtered_products } = state;
      switch (state.sort) {
        case "price-lowest":
          filtered_products.sort((a, b) => a.price - b.price);
          return { ...state, filtered_products };
        case "price-highest":
          filtered_products.sort((a, b) => b.price - a.price);
          return { ...state, filtered_products };
        case "name-a":
          filtered_products.sort((a, b) => a.name.localeCompare(b.name));
          return { ...state, filtered_products };
        case "name-z":
          filtered_products
            .sort((a, b) => a.name.localeCompare(b.name))
            .reverse();
          return { ...state, filtered_products };
        default:
      }
      break;

    //4. filter
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text.toLowerCase())
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((single) => single === color);
        });
      }
      //price
      tempProducts = tempProducts.filter((product) => product.price <= price);
      //shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping);
      }

      return { ...state, filtered_products: tempProducts };

    //5. Clear all filters
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          comapny: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    //6. default
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
