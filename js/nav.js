export class Nav {
  constructor() {
    this.toggle = true;
    this.container = document.querySelector(".container");
    this.nav = document.querySelector(".menuNav");
    this.menuIcon = document.querySelector(".menuIcon");
    this.todoText = document.querySelectorAll(".memuP");
    this.todoBtn = document.querySelectorAll(".menuLi");
    this.currentBtn = null;
  }

  // nav 토글 함수
  toggleNav() {
    if (toggle) {
      this.container.style.left = "50px";
      this.container.style.width = "calc(100% - 50px)";
      this.nav.style.width = "50px";
      this.nav.style.boxShadow = "none";
      todoText.forEach((e) => e.classList.add("hidden"));
      toggle = false;
    } else {
      this.container.style.left = "250px";
      this.container.style.width = "calc(100% - 250px)";
      if (window.innerWidth == 500) {
        this.container.style.left = "50px";
        this.container.style.width = "calc(100% - 50px)";
      }
      this.nav.style.width = "250px";
      todoText.forEach((e) => e.classList.remove("hidden"));
      toggle = true;
    }
  }

  // nav에서 mouseOver
  overNav(e) {
    if (!toggle) {
      this.style.boxShadow = "5px 9px 10px gray";
    } else {
      this.style.boxShadow = "none";
    }
    this.style.width = "250px";
    todoText.forEach((e) => e.classList.remove("hidden"));
  }

  // nav에서 mouseOut
  outNav(e) {
    if (!toggle) {
      this.style.boxShadow = "none";
      this.style.width = "50px";
      todoText.forEach((e) => e.classList.add("hidden"));
    } else {
      this.style.boxShadow = "none";
    }
  }

  // 메뉴 선택시 색상 변경
  changeNavColor(e) {
    if (this.currentBtn) {
      this.currentBtn.classList.remove("active_menu");
    }
    this.classList.add("active_menu");
    this.currentBtn = this;
  }
}

this.menuIcon.parentElement.addEventListener("click", openMenu);

this.todoBtn.forEach((e) => e.addEventListener("click", navChangeColor));

this.nav.addEventListener("mouseover", overNav);
this.nav.addEventListener("mouseout", outNav);
