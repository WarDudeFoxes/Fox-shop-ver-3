import { productCategories } from "./Data/categories-data.js";
import { allProducts } from "./all-product.js";
import { productLinkData, saveProductLinkData } from "./Data/product-link-data.js";
import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { browerData } from "./Account-Data/brower-user-data.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";


updateUserDetails();
searchController();

document.querySelector('.js-categories-container')
  .innerHTML = productCategories.map(({name, image, id, link}) => {
    return `
      <a href="${link}">
        <div class="category" data-id="${id}">
          <img src="${image}" alt="">
          <span>${name}</span>
        </div>
      </a>
    `;
  }).join('');


document.querySelector('.products-grid')
  .innerHTML = allProducts.map(({name, discountPriceCent, id, displayImage, soldNum}) => {
    return `
    <a href="product-link.html" target="_blank">
      <div class="product-container" data-id="${id}">
        <div class="like-container">
        <i class="fa-regular fa-heart like-btn fa-heart-${id}" aria-hidden="true"  data-id="${id}"></i>
        </div>
        <img src="${displayImage}" class="product-image" alt="">
        <div class="name">${name}</div>
        <div class="product-details">
          <div class="price">$${(discountPriceCent/100).toFixed(2)}</div>
          <div class="sold-rate">${soldNum}sold</div>
        </div>
      </div>
    </a>
    `;
  }).join('');

document.querySelectorAll('.like-btn').forEach(elem => {
  elem.addEventListener('click', () => {

    if (!browerData) {
      window.location.href = 'login.html'
    }
  })
})

updateWishListDisplay();
calculateCartQuantity();

document.querySelectorAll('.product-container').forEach(link => {
  link.addEventListener('click', () => {
    const id = link.dataset.id
    productLinkData.id = id
    saveProductLinkData();
  });
});



 
// if (/\s/g.test(inputEl.value) || !inputEl.value) {
//   alert()
//   };