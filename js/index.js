const body = document.querySelector("body");
body.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (body.scrollTop == 0) {
    header.style.boxShadow = "none";
  } else {
    header.style.boxShadow = "1px 5px 10px gray";
  }
});

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
let chkNum = 0;

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

// 모달 생성
document.querySelector(".menuLi").addEventListener("click", function () {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  document.querySelector("body").appendChild(modal);
  const modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  modal.appendChild(modalBg);
  const addModal = document.createElement("div");
  addModal.setAttribute("class", "addModal");
  modal.appendChild(addModal);
  const modalHeader = document.createElement("header");
  modalHeader.setAttribute("class", "modalHeader");
  addModal.appendChild(modalHeader);

  // 오늘 날짜 생성
  let today = new Date();
  let myday = today;
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getDay();

  const monthStr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayStr = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const leftIDiv = document.createElement("div");
  leftIDiv.setAttribute("class", "iconDiv");
  modalHeader.appendChild(leftIDiv);
  const leftI = document.createElement("i");
  leftI.setAttribute("class", "fas fa-angle-left");
  leftIDiv.appendChild(leftI);

  const modalToday = document.createElement("h1");
  modalToday.setAttribute("class", "modalToday");
  modalHeader.appendChild(modalToday);
  modalToday.textContent = `${dayStr[day]}, ${monthStr[month]} ${date}th`;

  const rightIDiv = document.createElement("div");
  rightIDiv.setAttribute("class", "iconDiv");
  modalHeader.appendChild(rightIDiv);
  const rightI = document.createElement("i");
  rightI.setAttribute("class", "fas fa-angle-right");
  rightIDiv.appendChild(rightI);

  leftI.parentElement.addEventListener("click", function () {
    myday.setDate(myday.getDate() - 1);
    modalToday.textContent = `${dayStr[myday.getDay()]}, ${
      monthStr[myday.getMonth()]
    } ${myday.getDate()}th`;
  });
  rightI.parentElement.addEventListener("click", function () {
    myday.setDate(myday.getDate() + 1);
    modalToday.textContent = `${dayStr[myday.getDay()]}, ${
      monthStr[myday.getMonth()]
    } ${myday.getDate()}th`;
  });

  const article = document.createElement("article");
  addModal.appendChild(article);
  const addListDiv = document.createElement("div");
  addListDiv.setAttribute("class", "addListDiv");
  article.appendChild(addListDiv);
  const addListText = document.createElement("input");
  addListText.setAttribute("type", "text");
  addListText.setAttribute("class", "addListText");
  addListText.setAttribute("maxlength", "12");
  addListText.setAttribute("placeholder", "input here...");
  addListDiv.appendChild(addListText);
  const addListBtn = document.createElement("button");
  addListBtn.setAttribute("class", "addListBtn");
  addListBtn.innerHTML = "ADD";
  addListDiv.appendChild(addListBtn);
  const listDiv = document.createElement("div");
  listDiv.setAttribute("class", "listDiv");
  article.appendChild(listDiv);
  const addItemBtn = document.createElement("button");
  addItemBtn.setAttribute("class", "addItemBtn");
  addItemBtn.innerHTML = "BUTTON";
  article.appendChild(addItemBtn);

  // arrowVisibility
  modalHeader.onmouseover = function () {
    this.querySelectorAll(".iconDiv").forEach(
      (e) => (e.style.visibility = "visible")
    );
  };
  modalHeader.onmouseout = function () {
    this.querySelectorAll(".iconDiv").forEach(
      (e) => (e.style.visibility = "hidden")
    );
  };

  // 생성 모달에 list 추가
  addListBtn.addEventListener("click", function (e) {
    if (!regex.test(addListText.value)) {
      setTimeout(() => {
        addListText.classList.add("errorAni");
      });
      addListText.classList.remove("errorAni");
      addListText.focus();
    } else {
      // list
      const listDiv = document.querySelector(".listDiv");
      const list = document.createElement("div");
      list.setAttribute("class", "list");
      listDiv.appendChild(list);

      // text
      const textValue = document.querySelector(".addListText").value;
      const text = document.createElement("div");
      text.setAttribute("class", "text");
      text.innerHTML = textValue;
      listDiv.lastChild.appendChild(text);

      // iconBox
      const iconBox = document.createElement("div");
      iconBox.setAttribute("class", "iconBox");
      listDiv.lastChild.appendChild(iconBox);

      // exclamation
      const iconDiv1 = document.createElement("div");
      iconDiv1.setAttribute("class", "iconDiv");
      listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv1);
      const exclmI = document.createElement("i");
      exclmI.setAttribute("class", "fas fa-exclamation");
      listDiv.lastChild
        .querySelector(".iconBox")
        .firstChild.appendChild(exclmI);

      // trash
      const iconDiv2 = document.createElement("div");
      iconDiv2.setAttribute("class", "iconDiv");
      listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv2);
      const trashI = document.createElement("i");
      trashI.setAttribute("class", "fas fa-trash-alt");
      listDiv.lastChild.querySelector(".iconBox").lastChild.appendChild(trashI);

      exclmI.parentElement.addEventListener("click", exclming);
      trashI.parentElement.addEventListener("click", trashing);
    }

    addListText.value = "";
  });

  // item 생성
  addItemBtn.addEventListener("click", function (e) {
    document.querySelector(".addModal").classList.remove("errorAni");
    if (listDiv.childNodes.length == 0) {
      setTimeout(() => {
        document.querySelector(".addModal").classList.add("errorAni");
      });
      document.querySelector(".addModal").classList.remove("errorAni");
      addListText.focus();
    } else {
      const container = document.querySelector(".container");

      const item = document.createElement("div");
      item.setAttribute("class", "item");
      container.prepend(item);
      const itemToday = document.createElement("h3");
      itemToday.setAttribute("class", "itemToday");
      itemToday.innerHTML = document.querySelector(".modalToday").innerHTML;
      item.appendChild(itemToday);
      const itemListDiv = document.createElement("div");
      itemListDiv.setAttribute("class", "itemListDiv");
      item.appendChild(itemListDiv);

      const listDiv = document.querySelector(".listDiv");
      for (let i = 0; i < listDiv.childElementCount; i++) {
        const itemList = document.createElement("div");
        itemList.setAttribute("class", "itemList");
        itemListDiv.appendChild(itemList);
        const itemChk = document.createElement("input");
        itemChk.setAttribute("type", "checkbox");
        itemChk.setAttribute("class", "itemChk");
        itemChk.setAttribute("id", "itemChk_" + chkNum);
        itemChk.setAttribute("disabled", "");
        itemListDiv.lastChild.appendChild(itemChk);
        const itemLabel = document.createElement("label");
        itemLabel.setAttribute("for", "itemChk_" + chkNum);
        itemListDiv.lastChild.appendChild(itemLabel);
        const itemText = document.createElement("div");
        itemText.setAttribute("class", "itemText");
        itemText.innerHTML =
          listDiv.childNodes[i].querySelector(".text").innerHTML;
        itemListDiv.lastChild.appendChild(itemText);

        if (
          listDiv.childNodes[i]
            .querySelector(".text")
            .classList.contains("exclming")
        ) {
          itemListDiv.childNodes[i]
            .querySelector(".itemText")
            .classList.add("exclming");
        } else {
          itemListDiv.childNodes[i]
            .querySelector(".itemText")
            .classList.remove("exclming");
        }
        chkNum++;
      }

      const itemService = document.createElement("div");
      itemService.setAttribute("class", "itemService");
      item.appendChild(itemService);
      const iconDiv1 = document.createElement("div");
      iconDiv1.setAttribute("class", "iconDiv");
      itemService.appendChild(iconDiv1);
      const editI = document.createElement("i");
      editI.setAttribute("class", "far fa-edit");
      iconDiv1.appendChild(editI);
      const iconDiv2 = document.createElement("div");
      iconDiv2.setAttribute("class", "iconDiv");
      itemService.appendChild(iconDiv2);
      const trashI = document.createElement("i");
      trashI.setAttribute("class", "far fa-trash-alt");
      iconDiv2.appendChild(trashI);

      item.onmouseover = function (e) {
        this.querySelector(".itemService").style.visibility = "visible";
      };
      item.onmouseout = function (e) {
        this.querySelector(".itemService").style.visibility = "hidden";
      };
      // item 삭제
      trashI.parentElement.addEventListener("click", trashing);

      // item 선택 모달
      item.addEventListener("click", function (e) {
        const modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        document.querySelector("body").appendChild(modal);
        const modalBg = document.createElement("div");
        modalBg.setAttribute("class", "modalBg");
        modal.appendChild(modalBg);
        const addModal = document.createElement("div");
        addModal.setAttribute("class", "addModal");
        modal.appendChild(addModal);
        const modalHeader = document.createElement("header");
        modalHeader.setAttribute("class", "editModalHeader");
        addModal.appendChild(modalHeader);
        const modalToday = document.createElement("h1");
        modalToday.setAttribute("class", "modalToday");
        modalToday.innerHTML = this.querySelector("h3").innerHTML;
        modalHeader.appendChild(modalToday);
        const article = document.createElement("article");
        addModal.appendChild(article);
        const addListDiv = document.createElement("div");
        addListDiv.setAttribute("class", "addListDiv");
        article.appendChild(addListDiv);
        const addListText = document.createElement("input");
        addListText.setAttribute("type", "text");
        addListText.setAttribute("class", "addListText");
        addListText.setAttribute("maxlength", "12");
        addListText.setAttribute("placeholder", "input here");
        addListDiv.appendChild(addListText);
        const selectAddListBtn = document.createElement("button");
        selectAddListBtn.setAttribute("class", "selectAddListBtn");
        selectAddListBtn.innerHTML = "ADD";
        addListDiv.appendChild(selectAddListBtn);
        const listDiv = document.createElement("div");
        listDiv.setAttribute("class", "listDiv");
        article.appendChild(listDiv);

        for (
          let i = 0;
          i < this.querySelector(".itemListDiv").childElementCount;
          i++
        ) {
          const list = document.createElement("div");
          list.setAttribute("class", "list");
          listDiv.appendChild(list);
          const chk = document.createElement("input");
          chk.setAttribute("type", "checkbox");
          chk.setAttribute("class", "chk");
          chk.setAttribute("id", "chk_" + chkNum);
          listDiv.lastChild.appendChild(chk);
          const label = document.createElement("label");
          label.setAttribute("for", "chk_" + chkNum);
          listDiv.lastChild.appendChild(label);
          const text = document.createElement("div");
          text.setAttribute("class", "selectText");
          text.innerHTML =
            this.querySelector(".itemListDiv").childNodes[i].querySelector(
              ".itemText"
            ).innerHTML;
          listDiv.lastChild.appendChild(text);
          const iconBox = document.createElement("div");
          iconBox.setAttribute("class", "iconBox");
          listDiv.lastChild.appendChild(iconBox);
          const iconDiv1 = document.createElement("div");
          iconDiv1.setAttribute("class", "iconDiv");
          listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv1);
          const exclmI = document.createElement("i");
          exclmI.setAttribute("class", "fas fa-exclamation");
          listDiv.lastChild
            .querySelector(".iconBox")
            .firstChild.appendChild(exclmI);
          exclmI.parentElement.addEventListener("click", exclming);
          const iconDiv2 = document.createElement("div");
          iconDiv2.setAttribute("class", "iconDiv");
          listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv2);
          const trashI = document.createElement("i");
          trashI.setAttribute("class", "fas fa-trash-alt");
          listDiv.lastChild
            .querySelector(".iconBox")
            .lastChild.appendChild(trashI);
          trashI.parentElement.addEventListener("click", trashing);
          if (
            this.querySelector(".itemListDiv").childNodes[i].querySelector(
              ".itemChk"
            ).checked
          ) {
            listDiv.childNodes[i].querySelector(".chk").checked = true;
            listDiv.childNodes[i]
              .querySelector(".chk")
              .nextElementSibling.nextElementSibling.classList.add("chking");
          } else {
            listDiv.childNodes[i].querySelector(".chk").checked = false;
            listDiv.childNodes[i]
              .querySelector(".chk")
              .nextElementSibling.nextElementSibling.classList.remove("chking");
          }

          if (
            this.querySelector(".itemListDiv")
              .childNodes[i].querySelector(".itemText")
              .classList.contains("exclming")
          ) {
            listDiv.childNodes[i]
              .querySelector(".selectText")
              .classList.add("exclming");
          } else {
            listDiv.childNodes[i]
              .querySelector(".selectText")
              .classList.remove("exclming");
          }
          chkNum++;
          chk.addEventListener("click", chking);
        }

        const editItemBtn = document.createElement("button");
        editItemBtn.setAttribute("class", "editItemBtn");
        editItemBtn.innerHTML = "EDIT";
        article.appendChild(editItemBtn);

        // 선택 모달에 list 추가
        selectAddListBtn.addEventListener("click", function (e) {
          if (!regex.test(addListText.value)) {
            setTimeout(() => {
              addListText.classList.add("errorAni");
            });
            addListText.classList.remove("errorAni");
            addListText.focus();
          } else {
            // list
            const list = document.createElement("div");
            list.setAttribute("class", "list");
            listDiv.appendChild(list);

            // chk
            const chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");
            chk.setAttribute("class", "chk");
            chk.setAttribute("id", "chk_" + chkNum);
            listDiv.lastChild.appendChild(chk);

            // label
            const label = document.createElement("label");
            label.setAttribute("for", "chk_" + chkNum);
            listDiv.lastChild.appendChild(label);

            // text
            const textValue = document.querySelector(".addListText").value;
            const text = document.createElement("div");
            text.setAttribute("class", "selectText");
            text.innerText = textValue;
            listDiv.lastChild.appendChild(text);

            // iconBox
            const iconBox = document.createElement("div");
            iconBox.setAttribute("class", "iconBox");
            listDiv.lastChild.appendChild(iconBox);

            // exclamation
            const iconDiv1 = document.createElement("div");
            iconDiv1.setAttribute("class", "iconDiv");
            listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv1);
            const exclmI = document.createElement("i");
            exclmI.setAttribute("class", "fas fa-exclamation");
            listDiv.lastChild
              .querySelector(".iconBox")
              .firstChild.appendChild(exclmI);

            // trash
            const iconDiv2 = document.createElement("div");
            iconDiv2.setAttribute("class", "iconDiv");
            listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv2);
            const trashI = document.createElement("i");
            trashI.setAttribute("class", "fas fa-trash-alt");
            listDiv.lastChild
              .querySelector(".iconBox")
              .lastChild.appendChild(trashI);

            exclmI.parentElement.addEventListener("click", exclming);
            trashI.parentElement.addEventListener("click", trashing);
            chk.addEventListener("click", chking);
            chkNum++;
          }

          addListText.value = "";
        });

        const selectItemListDiv = this.querySelector(".itemListDiv");
        // 수정된 list를 item에 적용.(추가, 삭제, 체크)
        editItemBtn.addEventListener("click", function () {
          if (listDiv.childElementCount == 0) {
            setTimeout(() => {
              document.querySelector(".addModal").classList.add("errorAni");
            });
            document.querySelector(".addModal").classList.remove("errorAni");
            addListText.focus();
          } else {
            // 기존 item에 list 비우기
            while (selectItemListDiv.hasChildNodes()) {
              selectItemListDiv.removeChild(selectItemListDiv.firstChild);
            }
            // 새로운 list 추가
            for (let i = 0; i < listDiv.childElementCount; i++) {
              const itemList = document.createElement("div");
              itemList.setAttribute("class", "itemList");
              selectItemListDiv.appendChild(itemList);
              const itemChk = document.createElement("input");
              itemChk.setAttribute("type", "checkbox");
              itemChk.setAttribute("class", "itemChk");
              itemChk.setAttribute("id", "itemChk_" + chkNum);
              itemChk.setAttribute("disabled", "");
              selectItemListDiv.lastChild.appendChild(itemChk);
              const itemLabel = document.createElement("label");
              itemLabel.setAttribute("for", "itemChk_" + chkNum);
              selectItemListDiv.lastChild.appendChild(itemLabel);
              const itemText = document.createElement("div");
              itemText.setAttribute("class", "itemText");
              itemText.innerHTML =
                listDiv.childNodes[i].querySelector(".selectText").innerHTML;
              selectItemListDiv.lastChild.appendChild(itemText);
              if (listDiv.childNodes[i].querySelector(".chk").checked) {
                selectItemListDiv.childNodes[i].querySelector(
                  ".itemChk"
                ).checked = true;
                selectItemListDiv.childNodes[i]
                  .querySelector(".itemChk")
                  .nextElementSibling.nextElementSibling.classList.add(
                    "chking"
                  );
              } else {
                selectItemListDiv.childNodes[i].querySelector(
                  ".itemChk"
                ).checked = false;
                selectItemListDiv.childNodes[i]
                  .querySelector(".itemChk")
                  .nextElementSibling.nextElementSibling.classList.remove(
                    "chking"
                  );
              }
              if (
                listDiv.childNodes[i]
                  .querySelector(".selectText")
                  .classList.contains("exclming")
              ) {
                selectItemListDiv.childNodes[i]
                  .querySelector(".itemText")
                  .classList.add("exclming");
              } else {
                selectItemListDiv.childNodes[i]
                  .querySelector(".itemText")
                  .classList.remove("exclming");
              }
              chkNum++;
            }
            (function () {
              document.querySelector(".modal").remove();
            })();
          }
          masonry_layout();
        });

        modalBg.addEventListener("click", modalClose);
      });

      (function () {
        document.querySelector(".modal").remove();
      })();
    }
    masonry_layout();
  });

  // 모달 종료 및 데이터 리셋
  const modalClose = function () {
    document.querySelector(".modal").remove();
  };
  modalBg.addEventListener("click", modalClose);

  // 선택 모달에 체크 박스 이벤트
  const chking = function () {
    if (this.checked) {
      this.nextElementSibling.nextElementSibling.classList.add("chking");
    } else {
      this.nextElementSibling.nextElementSibling.classList.remove("chking");
    }
  };

  // 리스트 중요 표시 이벤트
  const exclming = function (e) {
    const text = this.parentElement.previousSibling;
    if (!text.classList.contains("exclming")) {
      text.classList.add("exclming");
    } else {
      text.classList.remove("exclming");
    }
  };
  // 리스트 & 아이템 삭제 이벤트
  const trashing = function (e) {
    this.parentElement.parentElement.remove();
    e.stopPropagation();
  };
});

function masonry_layout() {
  // const grid = getComputedStyle(document.querySelector(".container"));
  // const autoRows = parseInt(grid.getPropertyValue("grid-auto-rows")) || 0;
  // const gap = parseInt(grid.getPropertyValue("gap")) || 0;
  const items = document.querySelectorAll(".item");

  items.forEach((e) => {
    // e.style.gridRowEnd = `span ${Math.ceil(e.offsetHeight / gap + autoRows)}`;
    e.style.gridRowEnd = null;
    e.style.gridRowEnd = `span ${Math.ceil(e.offsetHeight / 10)}`;
  });
}
window.addEventListener("resize", masonry_layout());
