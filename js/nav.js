export class Nav {
  constructor(container) {
    this.toggle = true;
    this.container = container;
    this._nav = document.querySelector(".menuNav");
    this.menuIcon = document.querySelector(".menuIcon");
    this.todoText = document.querySelectorAll(".memuP");
    this.todoBtn = document.querySelectorAll(".menuLi");
    this.currentBtn = null;
  }

  // nav 토글 함수
  toggleNav = () => {
    if (this.toggle == true) {
      this.container.style.left = "50px";
      this.container.style.width = "calc(100% - 50px)";
      this._nav.style.width = "50px";
      this._nav.style.boxShadow = "none";
      this.todoText.forEach((e) => e.classList.add("hidden"));
      this.toggle = false;
    } else if (this.toggle == false) {
      this.container.style.left = "250px";
      this.container.style.width = "calc(100% - 250px)";
      if (window.innerWidth == 500) {
        this.container.style.left = "50px";
        this.container.style.width = "calc(100% - 50px)";
      }
      this._nav.style.width = "250px";
      this.todoText.forEach((e) => e.classList.remove("hidden"));
      this.toggle = true;
    }
  };

  // nav에서 mouseOver
  overNav = (e) => {
    if (!this.toggle) {
      this._nav.style.boxShadow = "5px 9px 10px gray";
    } else {
      this._nav.style.boxShadow = "none";
    }
    this._nav.style.width = "250px";
    this.todoText.forEach((e) => e.classList.remove("hidden"));
  };

  // nav에서 mouseOut
  outNav = (e) => {
    if (!this.toggle) {
      this._nav.style.boxShadow = "none";
      this._nav.style.width = "50px";
      this.todoText.forEach((e) => e.classList.add("hidden"));
    } else {
      this._nav.style.boxShadow = "none";
    }
  };

  // 메뉴 선택시 색상 변경
  changeNavColor = (e) => {
    if (this.currentBtn === true) {
      this.currentBtn.classList.remove("active_menu");
    } else if (this.currentBtn === false) {
      this.currentBtn.classList.add("active_menu");
      // this.currentBtn = this;
    }
  };
}
