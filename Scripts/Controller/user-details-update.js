import { browerData } from "../Account-Data/brower-user-data.js";
import { registerData } from "../Account-Data/register-data.js";


export function updateUserDetails() {
  let browerInfo;
  if (browerData) {
    registerData.forEach(data => {
      if (browerData === data.email) {
        browerInfo = data
      }
    })
  }
  
  if (browerInfo) {
    document.querySelector('.account-container span').innerHTML = browerInfo.firstName
    document.querySelector('.right-section a').setAttribute('href', 'account.html')
  } else {
    document.querySelectorAll('.right-section a').forEach(link => {
      link.setAttribute('href', 'login.html')
    })
  }
}