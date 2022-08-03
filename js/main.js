'use strict';
{
  const openMenu = document.getElementById('open-menu');
  const mask = document.getElementById('mask');

  const overlayMenu = document.querySelector('.overlay_menu');

  openMenu.addEventListener('click', () => {
    mask.classList.add('show');
    overlayMenu.classList.add('show');
  });

  mask.addEventListener('click', () => {
    mask.classList.remove('show');
    overlayMenu.classList.remove('show');
  });
}