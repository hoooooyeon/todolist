export class slider {
  constructor() {}
}

// 메뉴바 열고 닫기
let toggle = 1;
const openMenu = function () {
  if (toggle) {
    document.querySelector(".container").style.left = "50px";
    document.querySelector(".container").style.width = "calc(100% - 50px)";
    document.querySelector(".menuNav").style.width = "50px";
    document.querySelector(".menuNav").style.boxShadow = "none";
    document
      .querySelectorAll(".memuP")
      .forEach((e) => e.classList.add("hidden"));
    toggle = 0;
  } else {
    document.querySelector(".container").style.left = "250px";
    document.querySelector(".container").style.width = "calc(100% - 250px)";
    if (window.innerWidth == 500) {
      document.querySelector(".container").style.left = "50px";
      document.querySelector(".container").style.width = "calc(100% - 50px)";
    }
    document.querySelector(".menuNav").style.width = "250px";
    document
      .querySelectorAll(".memuP")
      .forEach((e) => e.classList.remove("hidden"));
    toggle = 1;
  }
};
document
  .querySelector(".menuIcon")
  .parentElement.addEventListener("click", openMenu);

// screen max-width: 500px
const screen500 = function (e) {
  if (window.innerWidth > 520 && toggle == 1) {
    document.querySelector(".container").style.left = "250px";
    document.querySelector(".container").style.width = "calc(100% - 250px)";
  }
  if (window.innerWidth == 500) {
    document.querySelector(".container").style.left = "50px";
    document.querySelector(".container").style.width = "calc(100% - 50px)";
    document.querySelector(".menuNav").style.width = "50px";
    document.querySelector(".menuNav").style.boxShadow = "none";
    document
      .querySelectorAll(".memuP")
      .forEach((e) => e.classList.add("hidden"));
    toggle = 0;
  }
};

window.addEventListener("resize", screen500);
window.addEventListener("load", screen500);

// 메뉴 호버 이벤트
document.querySelector(".menuNav").onmouseover = function (e) {
  if (toggle == 0) {
    this.style.boxShadow = "5px 9px 10px gray";
  } else {
    this.style.boxShadow = "none";
  }
  this.style.width = "250px";
  document
    .querySelectorAll(".memuP")
    .forEach((e) => e.classList.remove("hidden"));
};

document.querySelector(".menuNav").onmouseout = function (e) {
  if (toggle == 0) {
    this.style.boxShadow = "none";
    this.style.width = "50px";
    document
      .querySelectorAll(".memuP")
      .forEach((e) => e.classList.add("hidden"));
  } else {
    this.style.boxShadow = "none";
  }
};

// 메뉴 선택시 색상 변경
const menuLi = document.querySelectorAll(".menuLi");
let currentMenuLi;
const navChangeColor = function (e) {
  if (currentMenuLi) {
    currentMenuLi.classList.remove("active_menu");
  }
  this.classList.add("active_menu");
  currentMenuLi = this;
};
document
  .querySelectorAll(".menuLi")
  .forEach((e) => e.addEventListener("click", navChangeColor));
