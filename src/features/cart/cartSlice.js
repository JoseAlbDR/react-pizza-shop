import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload.pizzaId,
      );
      if (pizza) {
        pizza.quantity = pizza.quantity + 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    deletePizza(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    increasePizzaQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      pizza.quantity++;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },
    decreasePizzaQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      if (pizza.quantity === 0) return;
      pizza.quantity--;
      if (pizza.quantity === 0) {
        state.cart = state.cart.filter(
          (pizza) => pizza.pizzaId !== action.payload,
        );
      } else {
        pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      }
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addPizza,
  deletePizza,
  increasePizzaQuantity,
  decreasePizzaQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (total, item) => (total += item.unitPrice * item.quantity),
    0,
  );
