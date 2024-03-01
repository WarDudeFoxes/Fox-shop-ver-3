export const registerData = JSON.parse(localStorage.getItem('registerData')) ||
[{
  email: 'wardude@gmail.com',
  password: 'wardude',
  firstName: 'Waris',
  lastName: 'Ganiu',
  gender: 'Male'
}] 


export function saveRegisterData() {
  localStorage.setItem('registerData', JSON.stringify(registerData))
}