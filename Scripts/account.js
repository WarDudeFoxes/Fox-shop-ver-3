import { registerData } from "./Account-Data/register-data.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";
import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { productLinkData, saveProductLinkData } from "./Data/product-link-data.js";
import { allProducts } from "./all-product.js";

updateUserDetails();
searchController();

let browerData = JSON.parse(localStorage.getItem('browerDatas')) || '';
function saveBrowerData() {
  localStorage.setItem('browerDatas', JSON.stringify(browerData))
}

let userDetails;

if (browerData) {
  registerData.forEach(data => {
    if (browerData === data.email) {
      userDetails = data
    }
  })
}

if (userDetails) {
  document.querySelector('.account-name span').innerHTML = `${userDetails.lastName} ${userDetails.firstName}`
  document.querySelector('.account-email span').innerHTML = `${userDetails.email}`
} else {
  window.location.href = 'login.html'
}


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
        <button class="add-to-cart">Buy Now</button>
      </div>
    </a>
  `
}).join('');

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

document.querySelectorAll('.logout').forEach(elem => {
  elem.addEventListener('click', () => {
    browerData = ''
    saveBrowerData()
    window.location.href = 'index.html'
  });
});