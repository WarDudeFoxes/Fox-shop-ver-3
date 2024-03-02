export let searchValue = JSON.parse(localStorage.getItem('search-value')) || []


export function saveSearchValue() {
  localStorage.setItem('search-value', JSON.stringify(searchValue))
}