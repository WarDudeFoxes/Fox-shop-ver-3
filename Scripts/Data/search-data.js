export let searchValue = JSON.parse(localStorage.getItem('searchValue')) || ['']


export function saveSearchValue() {
  localStorage.setItem('searchValue', JSON.stringify(searchValue))
}