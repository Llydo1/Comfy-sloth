import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../utils/actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let IS_IN_CART = false;
      const { id, amount, currentColor, product } = action.payload;
      const newItem = { id, amount, color: currentColor, stock: product.stock };
      if (state.cart.length < 1) {
        state.cart.push(newItem);
        return { ...state, cart: state.cart };
      } else {
        const newCart = state.cart.map((item) => {
          if (item.id === id && item.color === currentColor) {
            IS_IN_CART = true;
            if (item.amount + amount > newItem.stock)
              return { ...item, amount: item.stock };
            else return { ...item, amount: item.amount + amount };
          }
          return item;
        });
        if (IS_IN_CART) return { ...state, cart: newCart };
      }
      state.cart.push(newItem);
      return { ...state, cart: state.cart };

    //Clear
    case CLEAR_CART:
      return { ...state };

    case COUNT_CART_TOTALS:
      return { ...state };

    case REMOVE_CART_ITEM:
      return { ...state };

    case TOGGLE_CART_ITEM_AMOUNT:
      return { ...state };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
