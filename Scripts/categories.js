import { calculateCartQuantity } from "./Controller/cart-quantity-update.js";
import { searchController } from "./Controller/general-search.js";
import { updateUserDetails } from "./Controller/user-details-update.js";

calculateCartQuantity();
updateUserDetails();
searchController();

document.querySelector('.top-categories-container a').setAttribute('href', 'index.html')