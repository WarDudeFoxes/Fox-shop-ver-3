import { browerData } from "../Account-Data/brower-user-data.js";
import { registerData } from "../Account-Data/register-data.js";

let infoMatch;
registerData.forEach(info => {
  if (info.email  === browerData) {
    infoMatch = info
  }; 
});

let savedLogItem = browerData ? infoMatch.password
: '';

export let carts = JSON.parse(localStorage.getItem(savedLogItem)) || [];


export function addToCart(id) {

  let matchingproduct;
  carts.forEach(cartItem => {
    if (cartItem.id === id) {
      matchingproduct = cartItem
    };
  });
    
  if (matchingproduct) {
    matchingproduct.quantity ++
  } else {
    carts.push({
      id,
      quantity: 1
    });
  };
  saveCartToStorage();
};



export function removeFromCart(id) {
  let newCart = [];
  carts.forEach(cartItem => {
    if (id !== cartItem.id) {
      newCart.push(cartItem);
    };
  });
  carts = newCart;
  saveCartToStorage();
};

export function saveCartToStorage() {
  localStorage.setItem(savedLogItem, JSON.stringify(carts))
};