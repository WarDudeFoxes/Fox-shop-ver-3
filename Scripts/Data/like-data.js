import { browerData } from "../Account-Data/brower-user-data.js";
import { registerData } from "../Account-Data/register-data.js";



let infoMatch;
registerData.forEach(info => {
  if (info.email  === browerData) {
    infoMatch = info
  }; 
});

let savedLogItem = browerData ? infoMatch.email
: '';

export let savedItems = JSON.parse(localStorage.getItem(savedLogItem)) || [];

export function addItemToLists(id) {

  const wishIcon = document.querySelector(`.fa-heart-${id}`);

  if (browerData) {
    let matchingitem;
    savedItems.forEach(product => {
      if (product.id === id) {
        matchingitem = product;

      };
    });
  
    if (matchingitem) {
      matchingitem.quantity --;
      unsaveItem(id);
      wishIcon.classList.replace('fa-solid', 'fa-regular');
      wishIcon.style.color = 'rgba(0, 0, 0, .75)'
    } else {
      savedItems.push({
        id,
        quantity: 1
      });
      wishIcon.classList.replace('fa-regular', 'fa-solid');
      wishIcon.style.color = 'rgba(255, 0, 0, .67)'
    };
    saveWishToStorage();
  }
};

export function unsaveItem(id) {
  let newWishlist = [];
  savedItems.forEach(likeItem => {
    if (id !== likeItem.id) {
      newWishlist.push(likeItem);
    };
  });
  savedItems = newWishlist;
  saveWishToStorage();
};


export function saveWishToStorage() {
  localStorage.setItem(savedLogItem, JSON.stringify(savedItems));
};