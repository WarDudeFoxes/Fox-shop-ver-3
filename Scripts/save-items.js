import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { savedItems, saveWishToStorage, unsaveItem } from "./Data/like-data.js";
import { allProducts } from "./all-product.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { productLinkData, saveProductLinkData } from "./Data/product-link-data.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";

updateUserDetails();
searchController();
updateSaveItemsPage();

function updateSaveItemsPage() {

  document.querySelector('.saved-item-product-container')
    .innerHTML = savedItems.map(wishItem => {
    
    let matchingproduct;
    allProducts.forEach(product => {
      if (wishItem.id === product.id) {
        matchingproduct = product
      }
    });
  
  
    return `
      <div class="saved-items-container saved-items-container-${matchingproduct.id}" data-id="${matchingproduct.id}">
        <div class="saved-items-details">
          <img src="${matchingproduct.displayImage}" alt="">
          <div class="saved-items-product-details">
            <div class="saved-items-product-name">
            ${matchingproduct.name}
            </div>
            <div class="saved-items-rating-icon">
            ${matchingproduct.rating.icon}
            </div>
            <div class="saved-items-product-price">
            USD ${(matchingproduct.priceCent/100).toFixed(2)}
            </div>
          </div>
        </div>
        <div class="saved-items-product-options">
        <a href="product-link.html" target="_blank">BUY NOW</a>
          <div class="remove-saved-product js-remove-saved-product" data-id="${matchingproduct.id}">
            <i class="fa fa-trash-can"></i>
            <span class="">REMOVE</span>
          </div>
        </div>
      </div>
    `
  }).join('');
  
  document.querySelectorAll('.js-remove-saved-product')
    .forEach(elem => {
      elem.addEventListener('click', () => {
        const id = elem.dataset.id
        const productCont = document.querySelector(`.saved-items-container-${id}`)
        productCont.remove();
        unsaveItem(id);
        updateSaveItemsPage();
      });
    });
  
  if (savedItems.length === 0) {
    document.querySelector('.emthy-saved-cart')
      .classList.remove('hide')
  } else {
    document.querySelector('.emthy-saved-cart')
    .classList.add('hide')
  };

  document.querySelector('.customer-views-product-grid')
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
        </div>
      </a>
    `
  }).join('');

  updateWishListDisplay();
};






document.querySelectorAll('.related-product, .saved-items-container')
.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.dataset.id
    productLinkData.id = id
    saveProductLinkData();
  });
});


updateWishListDisplay();
calculateCartQuantity();