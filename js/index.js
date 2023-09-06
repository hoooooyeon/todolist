import { Nav } from "./nav.js";
import { Modal } from "./modal.js";

const body = document.querySelector("body");
const container = document.querySelector(".container");
const todoBtn = document.querySelector(".menuLi");

let nav = new Nav(container);
let modal = new Modal(body, container, masonry_layout);

// 헤더 스크롤시 shadow 생성
body.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (body.scrollTop == 0) {
    header.style.boxShadow = "none";
  } else {
    header.style.boxShadow = "1px 5px 10px gray";
  }
});

// masonry Layout
function masonry_layout() {
  const items = document.querySelectorAll(".item");

  items.forEach((e) => {
    e.style.gridRowEnd = null;
    e.style.gridRowEnd = `span ${Math.ceil(e.offsetHeight / 10)}`;
  });
}

nav.menuIcon.parentElement.addEventListener("click", nav.toggleNav);
nav._nav.addEventListener("mouseover", nav.overNav);
nav._nav.addEventListener("mouseout", nav.outNav);

todoBtn.addEventListener("click", nav.changeNavColor);
todoBtn.addEventListener("click", modal.createModal);

window.addEventListener("resize", nav.toggleResizeNav);
window.addEventListener("load", nav.toggleResizeNav);
window.addEventListener("resize", masonry_layout());
