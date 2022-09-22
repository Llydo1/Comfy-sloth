import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../utils/actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    //Case 1: Add to cart
    case ADD_TO_CART: {
      let IS_IN_CART = false;
      const { id, currentColor, amount, product } = action.payload;
      const newItem = { id, color: currentColor, amount, product };
      let newArray = state.cart;
      if (state.cart.length < 1) {
        newArray.push(newItem);
      } else {
        const newCart = state.cart.map((item) => {
          if (item.id === id && item.color === currentColor) {
            IS_IN_CART = true;
            if (item.amount + amount > newItem.product.stock)
              return { ...item, amount: item.product.stock };
            else return { ...item, amount: item.amount + amount };
          }
          return item;
        });
        if (IS_IN_CART) return { ...state, cart: newCart };
        else {
          newArray.push(newItem);
        }
      }
      return { ...state, cart: [...newArray] };
    }

    //Case 2: TOGGLE_CART_ITEM_AMOUNT
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, color, value } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.id === id && item.color === color) {
          return { ...item, amount: item.amount + value };
        }
        return item;
      });
      return { ...state, cart: newCart };
    }

    //Case 3:Clear
    case CLEAR_CART:
      return { ...state, cart: [] };

    //Case 4: Count total
    case COUNT_CART_TOTALS: {
      const { totalAmount, totalPrice } = state.cart.reduce(
        (total, item) => {
          total.totalAmount += item.amount;
          total.totalPrice += item.amount * item.product.price;
          return total;
        },
        {
          totalAmount: 0,
          totalPrice: 0,
        }
      );
      return { ...state, total_items: totalAmount, total_amount: totalPrice };
    }

    case REMOVE_CART_ITEM: {
      const { id, color } = action.payload;
      const newCart = state.cart.filter(
        (item) => !(item.id === id && item.color === color)
      );
      return { ...state, cart: newCart };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
