export let carts = JSON.parse(localStorage.getItem('fox-shopCart-ver3')) || [];


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
  localStorage.setItem('fox-shopCart-ver3', JSON.stringify(carts))
};