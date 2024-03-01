
import { saveRegisterData, registerData } from "./Account-Data/register-data.js";

let browerData = JSON.parse(localStorage.getItem('browerDatas')) || '';
function saveBrowerData() {
  localStorage.setItem('browerDatas', JSON.stringify(browerData))
}

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const gender = document.querySelector('.gender');
const check = document.querySelector('.check');


document.querySelector('.continue').addEventListener('click', () => {

  if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.value)) {
  email.focus();
  alert('Please use a valid email.');
  } else if ((password.value).length < 5) {
    password.focus();
    alert('Please use a stronger password.')
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.focus();
    alert('Password do not match.')
  } else {
    document.querySelector('.form').classList.add('hide')
    document.querySelector('.form-personal-details').classList.remove('hide')
  }
});

document.querySelector('.register-btn').addEventListener('click', () =>{
  console.log('ok');
  if ((firstName.value).length < 2) {
    firstName.focus();
    alert('Please use your Name.')
  } else if ((lastName.value).length < 2) {
    lastName.focus();
    alert('Please use your name.')
  } else if (!(check.checked)) {
    alert('Please agree with Fox - shop Terms and Condition.')
  } else {
    registrationDetailsCheck();
  };
});

function registrationDetailsCheck() {
  let dataMatch;

  registerData.forEach(data => {
    if ((email.value).toLowerCase() === data.email) {
      dataMatch = data
    };
  });

  if (dataMatch) {
    alert('User already existed \nPlease Sign in.')
    window.location.href = 'login.html'
  } else {
    registerData.push({
      email: (email.value).toLowerCase(),
      password: password.value,
      firstName:  `${firstName.value[0].toUpperCase() + firstName.value.substring(1)}`,
      lastName:  `${lastName.value[0].toUpperCase() + lastName.value.substring(1)}`,
      gender: gender.value
    });
    saveRegisterData();
    browerData = (email.value).toLowerCase()
    saveBrowerData();
    window.location.href = 'index.html'
  };
};

document.querySelector('body').addEventListener('keyup', () => {
  updateBtnColor();
});

document.querySelector('body').addEventListener('click', () => {
  updateBtnColor();
});

function updateBtnColor() {
  if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.value) && (password.value).length > 4 && confirmPassword.value === password.value) {
    document.querySelector('.continue').style.backgroundColor = 'black';
  } else {
    document.querySelector('.continue').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  };

  if (((firstName.value).length > 1) && ((lastName.value).length > 1) && check.checked) {
    document.querySelector('.register-btn').style.backgroundColor = 'black';
  } else {
    document.querySelector('.register-btn').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  };
};