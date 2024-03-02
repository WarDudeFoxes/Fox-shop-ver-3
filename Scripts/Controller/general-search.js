import { searchValue, saveSearchValue } from "../Data/search-data.js";

export function searchController() {
  document.querySelectorAll('.search-icon').forEach(elem => {
    elem.addEventListener('click', () => {
      let inputEl = document.querySelectorAll('.index-search')
       
      inputEl.forEach(elem => {
        if (elem.value) {
          console.log(searchValue);
          searchValue[0] = elem.value
          console.log(searchValue[0]);
          saveSearchValue();
          window.location.href = 'product-search.html'
        }
      })
    })
  })
  

  document.querySelectorAll('.index-search').forEach(elem => {
    elem.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter') {
        
        let inputEl = document.querySelectorAll('.index-search')
        
        inputEl.forEach(elem => {
          if (elem.value) {
            searchValue[0] = elem.value
            saveSearchValue();
            window.location.href = 'product-search.html'
          }
        })
      }
    })
  })
  document.querySelectorAll('.index-search').forEach(elem => {
    elem.addEventListener('keyup', (ev) => {
      if (ev.key === 'Return') {
        
        let inputEl = document.querySelectorAll('.index-search')
        
        inputEl.forEach(elem => {
          if (elem.value) {
            searchValue[0] = elem.value
            saveSearchValue();
            window.location.href = 'product-search.html'
          }
        })
      }
    })
  })
}