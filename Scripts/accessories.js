import { accessoriesData } from "./Data/accessories-data.js";
import { productLinkData, saveProductLinkData } from "./Data/product-link-data.js";
import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";


updateUserDetails();
searchController();

document.querySelector('.category-products-grid')
  .innerHTML = accessoriesData.map(({displayImage, name, id, priceCent, brand
  })=> {
    
    return `
      <a href="product-link.html" target="_black">
        <div class="category-product-container" data-id="${id}">
          <div class="image-cont">
            <img src="${displayImage}" alt="">
          </div>
          <div class="category-product-name">
            ${name}
          </div>
          <div class="category-product-price">$${(priceCent/100).toFixed(2)}</div>
          <span>${brand}</span>
        </div>
      </a>
    `
  }).join('');


  document.querySelectorAll('.category-product-container').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.id
      productLinkData.id = id
      saveProductLinkData();
    });
  });

  calculateCartQuantity();