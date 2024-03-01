import { registerData } from "./Account-Data/register-data.js";

let browerData = JSON.parse(localStorage.getItem('browerDatas')) || '';
function saveBrowerData() {
  localStorage.setItem('browerDatas', JSON.stringify(browerData))
}
const email = document.querySelector('.email');
const password = document.querySelector('.password');

document.querySelector('.login')
  .addEventListener('click', () => {

    if (!email.value) {
      email.focus();
    } else if (!password.value) {
      password.focus();
    } else {
      let detailsMatch;

      registerData.forEach(data => {
        if (((email.value).toLowerCase() === data.email) && (password.value === data.password)) {
          detailsMatch = data
        };
      });

      if (detailsMatch) {
        browerData = (email.value).toLowerCase()
        saveBrowerData();
        window.location.href = 'account.html'
      } else {
        email.focus()
        password.value = ''
        alert('Invalid login details.')
      }
    };

    registerData.forEach(data => {
      if (!((email.value).toLowerCase() === data.email) && !(password.value === data.password)) {
        console.log('ok');
      };
    });
  });


document.querySelector('body')
  .addEventListener('keyup', () => {
    updateBtnColor();
  });

function updateBtnColor() {
  if (email.value && password.value ) {
    document.querySelector('.login').style.backgroundColor = 'black';
  } else {
    document.querySelector('.login').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  };
};

