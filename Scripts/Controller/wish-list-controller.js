import { savedItems,  } from "../Data/like-data.js";


export function updateWishListDisplay() {

  document.querySelectorAll('.product-container, .related-product-container, .js-product-container, .related-product, .related-products, .customer-views-product-grid')
  .forEach(cont => {
    const id = cont.dataset.id;
    const wishIcon = document.querySelector(`.fa-heart-${id}`);

    if (savedItems) {
      savedItems.forEach(savedItem => {
        if (savedItem.id === id) {
          wishIcon.classList.replace('fa-regular', 'fa-solid');
          wishIcon.style.color = 'rgba(255, 0, 0, .67)'
        }
      });
    };
  });  
};