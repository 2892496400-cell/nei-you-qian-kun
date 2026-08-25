if (sessionStorage.getItem('neiYouQianKun.unlocked') !== 'true') {
  window.location.replace('./index.html');
}

document.querySelector('#returnButton').addEventListener('click', () => {
  sessionStorage.removeItem('neiYouQianKun.unlocked');
  window.location.href = './index.html';
});
