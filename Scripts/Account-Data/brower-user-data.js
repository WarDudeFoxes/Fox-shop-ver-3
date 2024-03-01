export let browerData = JSON.parse(localStorage.getItem('browerDatas')) || '';

export function saveBrowerData() {
  localStorage.setItem('browerDatas', JSON.stringify(browerData))
}