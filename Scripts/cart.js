import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";
import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { carts, removeFromCart, saveCartToStorage } from "./Data/cart-data.js";
import { saveProductLinkData, productLinkData } from "./Data/product-link-data.js";
import { allProducts } from "./all-product.js";


updateUserDetails();
searchController();
updateCartPage();

function updateCartPage() {

  document.querySelector('.cart-products-cont')
    .innerHTML = carts.map(cart => {
  
      let productMatch;
      allProducts.forEach(product => {
        if (product.id === cart.id) {
          productMatch = product
        }
      })
  
      return `
        <div class="cart-product-container cart-product-container-${productMatch.id}" data-id="${productMatch.id}">
          <div class="cart-product-left-section">
            <img src="${productMatch.displayImage}" alt="">
            <div class="cart-product-detail-options">
              <div class="cart-product-name">
                ${productMatch.name}
              </div>
              <select disabled data-id="${productMatch.id}" class="cart-drop-down-${productMatch.id} cart-drop-down">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
              <div class="cart-product-options">
                <div class="save-later" data-id="${productMatch.id}">Save for later</div>
                <div class="remove js-remove" data-id="${productMatch.id}">Remove</div>
              </div>
            </div>
          </div>
          <h3 class="cart-product-price">USD ${(productMatch.discountPriceCent/100).toFixed(2)}</h3>
        </div>
      `
    }).join('');


  document.querySelectorAll('.cart-drop-down')
    .forEach(elem => {
      const id = elem.dataset.id
      carts.forEach(cart => {
        if (id === cart.id) {
          document.querySelector(`.cart-drop-down-${id}`).value = cart.quantity
        }
      })
    })

  let price = 0.00
  carts.forEach(cart => {
    allProducts.forEach(product => {
      if (cart.id === product.id) {
        const total = (product.discountPriceCent/100) * cart.quantity;

        price+=total
      }
    })
  })

  document.querySelectorAll('.total-price')
    .forEach(elem => {
      elem.innerHTML = `USD ${price.toFixed(2)}`;
    });
    


  document.querySelector('.related-products')
    .innerHTML = allProducts.map(({displayImage, name, discountPriceCent, id}) => {
      return `
        <a href="product-link.html" target="_blank">
          <div class="related-product"  data-id="${id}">
            <i class="fa-regular fa-heart fa-heart-${id}" aria-hidden="true"></i>
            <div class="related-product-img-cont">
              <img src="${displayImage}" alt="">
            </div>
            <div class="related-product-name">
              ${name}
            </div>
            <div class="related-product-price">
              USD ${(discountPriceCent/100).toFixed(2)}
            </div>
            <button class="add-to-cart">Buy Now</button>
          </div>
        </a>
      `
    }).join('');
  
    if (carts.length === 0) {
      document.querySelector('.emthy-cart-cont')
        .classList.remove('hide')
      document.querySelector('.available-cart-cont')
        .classList.add('hide')
      document.querySelector('.item-count')
        .innerHTML = `No item`
      document.querySelector('.price-type')
        .innerHTML = `Item total`
    } else if (carts.length === 1) {
      document.querySelector('.cart-product-title')
        .innerHTML = `${carts.length} item in your cart`
      document.querySelector('.emthy-cart-cont')
      .classList.add('hide');
      document.querySelector('.available-cart-cont')
        .classList.remove('hide');
      document.querySelector('.item-count')
        .innerHTML = `Total (1 item)`;
      document.querySelector('.price-type')
        .innerHTML = `Item total`;
    } else if (carts.length >1) {
      document.querySelector('.cart-product-title')
      .innerHTML = `${carts.length} items in your cart` 
      document.querySelector('.emthy-cart-cont')
      .classList.add('hide')
      document.querySelector('.available-cart-cont')
      .classList.remove('hide')
      document.querySelector('.item-count')
        .innerHTML = `Total (2 items)`
      document.querySelector('.price-type')
      .innerHTML = `Items total`
    }
  
  document.querySelectorAll('.js-remove')
    .forEach(link => {
      link.addEventListener('click', () => {
        const id = link.dataset.id
        const productCont = document.querySelector(`.cart-product-container-${id}`);
        
        removeFromCart(id);
        saveCartToStorage();
        productCont.remove();
        calculateCartQuantity();
        updateCartPage();
      });
    });

  document.querySelector('.checkout').addEventListener('click', {
    
  })

}

document.querySelectorAll('.related-product')
.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.dataset.id
    productLinkData.id = id
    saveProductLinkData();
  });
});

updateWishListDisplay();
calculateCartQuantity();
