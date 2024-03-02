import { productLinkData, saveProductLinkData } from "./Data/product-link-data.js";
import { allProducts } from "./all-product.js";
import { searchController } from "./Controller/general-search.js";
import { carts, addToCart } from "./Data/cart-data.js";
import { updateUserDetails } from "./Controller/user-details-update.js";
import { browerData } from "./Account-Data/brower-user-data.js";
import { addItemToLists, saveWishToStorage, savedItems } from "./Data/like-data.js";
import { updateWishListDisplay } from "./Controller/wish-list-controller.js";
import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";

updateUserDetails();
searchController();
let productMatch;


allProducts.forEach(product => {
  if (productLinkData.id === product.id) {
    productMatch = product
  };
});

document.title = productMatch.name

document.querySelector('.top-categories-container')
  .innerHTML = `
    <a href="index.html">Homepage</a>
    <i class="fa fa-angle-right" aria-hidden="true"></i>
    <a href="${productMatch.categoryLink}">${productMatch.category}</a>
    <i class="fa fa-angle-right" aria-hidden="true"></i>
    <a href="#">${productMatch.type}</a>
`;

document.querySelector('.js-product-container')
  .innerHTML = `
    <div class="image-section">
      <div class="image-scroll">
        <img src="${productMatch.moreImages.image1 ? productMatch.moreImages.image1 : '' }" alt="" data-id="${productMatch.id}">
        <img src="${productMatch.moreImages.image2 ? productMatch.moreImages.image2 : productMatch.displayImage }" alt="" data-id="${productMatch.id}">
        <img src="${productMatch.moreImages.image3 ? productMatch.moreImages.image3 : productMatch.displayImage}" alt="" data-id="${productMatch.id}">
        <img src="${productMatch.moreImages.image4 ? productMatch.moreImages.image4 : productMatch.displayImage}" alt="" data-id="${productMatch.id}">
      </div>
      <div class="display-image">
        <i class="fa fa-angle-left prev-image"  aria-hidden="true" data-id="${productMatch.id}"></i>
        <i class="fa-regular fa-heart fa-heart-${productMatch.id}" aria-hidden="true"  data-id="${productMatch.id}"></i>
        <div class="display-image-cont">
          <img src="${productMatch.displayImage}" class="display-image-${productMatch.id}" data-id="${productMatch.id}">
        </div>
        <i class="fa fa-angle-right next-img" aria-hidden="true" data-id="${productMatch.id}"></i>
      </div>
    </div>

    <div class="product-details-section">
      
      <div class="product-price">
        <h2 class="price">USD ${(productMatch.discountPriceCent/100).toFixed(2)}</h2>
        <div class="price2">${productMatch.priceCent ? 'USD '+ (productMatch.priceCent/100).toFixed(2) : ''}</div>
      </div>
      <span class="tax">Local taxes include (where apllicable)</span>
      <div class="name">${productMatch.name}</div>
      <div class="brand">
        <span>Brand:</span>
        <div class="company-name">${productMatch.brand}</div>
      </div>

      <div class="product-description">
        <div class="display description-display">
          <span>Item details</span>
          <i class="fa fa-angle-down description-arrow" aria-hidden="true"></i>
        </div>
        <div class="lines hide">
          <div class="line">${productMatch.description.line1}</div>
          <div class="line2 blurline">${productMatch.description.line2}</div>
          <div class="line3 hide">${productMatch.description.line3}</div>
          <div class="line4 hide">${productMatch.description.line4}</div>
          <div class="line5 hide">${productMatch.description.line5}</div>
        </div>

        <div class="description-note hide">Learn more about this item</div>
      </div>
      <div class="shipping-policies">
        <div class="display">
          <span>Shipping and return policies</span>
          <i class="fa fa-angle-down account-arrow" aria-hidden="true"></i>
        </div>
      </div>

      <div class="bottom-section">
        <div class="shop-rating">
          <span class="count">${productMatch.rating.count}</span> shop reviews <span>${productMatch.rating.icon}
          </span>
        </div>
        <button data-id="${productMatch.id}" class="add-to-cart">Add to cart</button>
      </div>
    </div>
  `;

document.querySelectorAll('.add-to-cart')
  .forEach(btn => {
    btn.addEventListener('click', () => {
      if (browerData) {
        const id =  btn.dataset.id
        addToCart(id);
        window.location.href = 'cart.html'
      } else {
        window.location.href = 'login.html'
      }
    })
  })

document.querySelector('.js-related-product-grid')
  .innerHTML = allProducts.map(product => {
    return `
    <a href="product-link.html">
      <div class="related-product-container" data-id="${product.id}">
        <i class="fa-regular fa-heart fa-heart-${product.id}" aria-hidden="true"></i>
        <img src="${product.displayImage}" alt="">
        <div class="related-product-name">${product.name}</div>
        <div class="related-product-price">
          <div class="discount-price">USD ${(product.discountPriceCent/100).toFixed(2)}</div>
          <span class="related-price">USD ${(product.priceCent/100).toFixed(2)}</span> 
          <span class="price-percentage">${product.soldNum} Sold</span>
        </div>
      </div>
    </a>
    `
  }).join('');

document.querySelectorAll('.related-product-container')
  .forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.id
      productLinkData.id = id
      saveProductLinkData();
    });
  });

document.querySelectorAll('.image-scroll img')
  .forEach(img => {
    img.addEventListener('click', () => {
      const id = img.dataset.id
      const displayImage = document.querySelector(`.display-image-${id}`);
      displayImage.src = img.src
    })
  })

document.querySelectorAll('.fa-heart')
  .forEach(elem => {
    elem.addEventListener('click', () => {
      const id = elem.dataset.id
      if (browerData) {
        addItemToLists(id);
        saveWishToStorage();
        updateWishListDisplay();
        console.log(savedItems);
      } else {
        window.location.href = 'login.html'
      }
    })
  })

  document.querySelectorAll('.like-btn').forEach(elem => {
    elem.addEventListener('click', () => {
  
      if (!browerData) {
        window.location.href = 'login.html'
      }
    })
  })

  updateWishListDisplay();
  calculateCartQuantity();

document.querySelector('.description-display')
    .addEventListener('click', () => {
    const arrow = document.querySelector('.description-arrow');

    document.querySelector('.lines').classList.toggle('hide');

    if (arrow.classList.contains('fa-angle-down')) {
      document.querySelector('.product-description').style.paddingBottom = '40px'
      arrow.classList.replace('fa-angle-down', 'fa-angle-up');
    } else {
      document.querySelector('.product-description').style.paddingBottom = '0'
      arrow.classList.replace('fa-angle-up', 'fa-angle-down')
    };
    
    document.querySelector('.line2').classList.add('blurline');
    document.querySelectorAll('.line3, .line4, .line5').forEach(elem => {
      elem.classList.add('hide')
    });
    document.querySelector('.description-note').innerHTML = 'Learn more about this item'
    document.querySelector('.description-note').classList.toggle('hide');
  });

document.querySelector('.description-note')
  .addEventListener('click', () => {
    if (document.querySelector('.description-note').innerHTML === 'Learn more about this item') {
      document.querySelector('.description-note').innerHTML = 'Show less'
    } else {
      document.querySelector('.description-note').innerHTML = 'Learn more about this item'
    };

    document.querySelector('.line2').classList.toggle('blurline');
  
    document.querySelectorAll('.line3, .line4, .line5').forEach(elem => {
      elem.classList.toggle('hide')
    });
  });