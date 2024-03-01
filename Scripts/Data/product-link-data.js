export let productLinkData = JSON.parse(localStorage.getItem('product-link-data')) || {
  id: 'nFontStyleTimesNewRomancdcdcndcn'
}


export function saveProductLinkData() {
  localStorage.setItem('product-link-data', JSON.stringify(productLinkData))
}