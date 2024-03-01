import { carts } from "../Data/cart-data.js";



export function calculateCartQuantity() {
  
  let cartquantity = 0;
  carts.forEach(cartItem => {
    cartquantity += cartItem.quantity;
  });

  document.querySelectorAll('.cart-quantity').forEach(elem => {
    elem.innerHTML = cartquantity;
  });
};