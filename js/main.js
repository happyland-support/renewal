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


  // タブの切り替え


  // class tab {
  //   constructor() {
  //     this tabs = document.querySelectorAll('.tabs li a');
  //     this points = document.querySelectorAll('.point');
  //   }
    
  //   this.tabs.forEach(tab => {
  //     tab.addEventListener('click', e => {
  //       e.preventDefault();
  
  //       tabs.forEach(tab => {
  //         tab.classList.remove('active');
  //       });
  //       tab.classList.add('active');
  
  //       points.forEach(point => {
  //         point.classList.remove('active');
  //       });
  //       document.getElementById(tab.dataset.id).classList.add('active');
  //     });
  //   });
  // }

  // new tab();

  const tabs = document.querySelectorAll('.tabs li a');
  const points = document.querySelectorAll('.point');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();

      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');

      points.forEach(point => {
        point.classList.remove('active');
      });
      document.getElementById(tab.dataset.id).classList.add('active');
    });
  });










}