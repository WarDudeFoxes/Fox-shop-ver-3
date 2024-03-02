import { allProducts } from "./all-product.js";
import { saveSearchValue, searchValue } from "./Data/search-data.js";
import { saveProductLinkData, productLinkData } from "./Data/product-link-data.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { searchController } from "./Controller/general-search.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";


document.querySelectorAll('.search-icon')
  .forEach(elem => {
    elem.addEventListener('click', () => {
      let inputEl = document.querySelectorAll('.index-search');

      inputEl.forEach(elem => {
        if (elem.value) {
          searchValue[0] = elem.value
          saveSearchValue();
          window.location.href = 'product-search.html'
        };
      })
    })
});

document.querySelectorAll('input')
  .forEach(elem => {
    elem.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter') {
            
        let inputEl = document.querySelectorAll('.index-search');
    
          inputEl.forEach(elem => {
            if (elem.value) {
              searchValue[0] = elem.value
              saveSearchValue();
              window.location.href = 'product-search.html'
            };
          })
      };
    });
  })


document.querySelector('input').value = searchValue[0].toLowerCase()

updateUserDetails();
searchFun();
export function searchFun() {
 
  let productSearch = [];

  allProducts.forEach(product => {
    product.keywords.forEach(word => {
      if (word.toLowerCase().includes(searchValue[0].toLowerCase())) {
        productSearch.push(product);
        return 
      } else {

      }
    });  
  });

  document.querySelector('.products-grid')
    .innerHTML = productSearch.map(({name, discountPriceCent, id, displayImage, soldNum}) => {
      return `
      <a href="product-link.html" target="_blank">
        <div class="product-container" data-id="${id}">
          <div class="like-container">
          <i class="fa-regular fa-heart fa-heart-${id}" aria-hidden="true"  data-id="${id}"></i>
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
};


if (searchValue[0]) {
  document.querySelector('.index-search-title').innerHTML = `Search Result for ${searchValue[0]}`
} else if (document.querySelector('.products-grid')
.innerHTML === '') {
  console.log('ok');
  document.querySelector('.index-search-title').innerHTML = `No result Found`
}


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

updateWishListDisplay();

  document.querySelectorAll('.product-container, .related-product').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.id
      productLinkData.id = id
      saveProductLinkData();
    });
  });


  calculateCartQuantity();