export class Modal {
  constructor(body, container, masonry_layout) {
    this.monthStr = [
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
    this.dayStr = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    this.regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    this.chkNum = 0;
    this._body = body;
    this._container = container;
    this._modal = null;
    this._addModal = null;
    this._modalHeader = null;
    this._addListText = null;
    this._listDiv = null;
    this._itemListDiv = null;

    this.masonry_layout = masonry_layout;
  }

  // 모달 생성
  createModal = () => {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    this._body.appendChild(modal);
    const modalBg = document.createElement("div");
    modalBg.setAttribute("class", "modalBg");
    modal.appendChild(modalBg);
    const addModal = document.createElement("div");
    addModal.setAttribute("class", "addModal");
    modal.appendChild(addModal);
    const modalHeader = document.createElement("header");
    modalHeader.setAttribute("class", "modalHeader");
    addModal.appendChild(modalHeader);

    this._modal = modal;
    this._modalHeader = modalHeader;
    this._addModal = addModal;

    this.createModalHeader();
    this.createModalContent();

    modalBg.addEventListener("click", this.modalClose);
  };

  // 모달 헤더 생성
  createModalHeader = () => {
    let today = new Date();
    let myday = today;
    let month = today.getMonth();
    let date = today.getDate();
    let day = today.getDay();
    const leftIDiv = document.createElement("div");
    leftIDiv.setAttribute("class", "iconDiv");
    this._modalHeader.appendChild(leftIDiv);
    const leftI = document.createElement("i");
    leftI.setAttribute("class", "fas fa-angle-left");
    leftIDiv.appendChild(leftI);
    const modalToday = document.createElement("h1");
    modalToday.setAttribute("class", "modalToday");
    this._modalHeader.appendChild(modalToday);
    modalToday.textContent = `${this.dayStr[day]}, ${this.monthStr[month]} ${date}th`;
    const rightIDiv = document.createElement("div");
    rightIDiv.setAttribute("class", "iconDiv");
    this._modalHeader.appendChild(rightIDiv);
    const rightI = document.createElement("i");
    rightI.setAttribute("class", "fas fa-angle-right");
    rightIDiv.appendChild(rightI);
    leftI.parentElement.addEventListener("click", function () {
      myday.setDate(myday.getDate() - 1);
      modalToday.textContent = `${this.dayStr[myday.getDay()]}, ${
        this.monthStr[myday.getMonth()]
      } ${myday.getDate()}th`;
    });
    rightI.parentElement.addEventListener("click", function () {
      myday.setDate(myday.getDate() + 1);
      modalToday.textContent = `${this.dayStr[myday.getDay()]}, ${
        this.monthStr[myday.getMonth()]
      } ${myday.getDate()}th`;
    });
    // arrowVisibility
    this._modalHeader.addEventListener(
      "mouseover",
      this._modalHeader
        .querySelectorAll(".iconDiv")
        .forEach((e) => (e.style.visibility = "visible"))
    );
    this._modalHeader.addEventListener(
      "mouseout",
      this._modalHeader
        .querySelectorAll(".iconDiv")
        .forEach((e) => (e.style.visibility = "hidden"))
    );
  };

  createModalContent = () => {
    const article = document.createElement("article");
    this._addModal.appendChild(article);
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
    addItemBtn.innerHTML = "Confirm";
    article.appendChild(addItemBtn);

    addListBtn.addEventListener("click", this.createMemoList);
    addItemBtn.addEventListener("click", this.createItem);

    this._addListText = addListText;
    this._listDiv = listDiv;
  };

  // 생성 모달에 list 추가
  createMemoList = () => {
    if (!this.regex.test(this._addListText.value)) {
      setTimeout(() => {
        this._addListText.classList.add("errorAni");
      });
      this._addListText.classList.remove("errorAni");
      this._addListText.focus();
    } else {
      // list
      const listDiv = document.querySelector(".listDiv");
      const list = document.createElement("div");
      list.setAttribute("class", "list");
      listDiv.appendChild(list);

      // text
      const textValue = this._addListText.value;
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

      exclmI.parentElement.addEventListener("click", () => {
        this.exclming(exclmI.parentElement);
      });

      trashI.parentElement.addEventListener("click", (e) => {
        this.trashing(trashI.parentElement, e);
      });

      this._addListText.value = "";
    }
  };

  // item 생성
  createItem = () => {
    this._addModal.classList.remove("errorAni");
    if (this._listDiv && this._listDiv.childNodes.length == 0) {
      setTimeout(() => {
        this._addModal.classList.add("errorAni");
      });
      this._addModal.classList.remove("errorAni");
      this._addListText.focus();
    } else if (this._listDiv && this._listDiv.childNodes.length > 0) {
      const item = document.createElement("div");
      item.setAttribute("class", "item");
      this._container.prepend(item);
      const itemToday = document.createElement("h3");
      itemToday.setAttribute("class", "itemToday");
      itemToday.innerHTML = document.querySelector(".modalToday").innerHTML;
      item.appendChild(itemToday);
      const itemListDiv = document.createElement("div");
      itemListDiv.setAttribute("class", "itemListDiv");
      item.appendChild(itemListDiv);

      for (let i = 0; i < this._listDiv.childElementCount; i++) {
        const itemList = document.createElement("div");
        itemList.setAttribute("class", "itemList");
        itemListDiv.appendChild(itemList);
        const itemChk = document.createElement("input");
        itemChk.setAttribute("type", "checkbox");
        itemChk.setAttribute("class", "itemChk");
        itemChk.setAttribute("id", "itemChk_" + this.chkNum);
        itemChk.setAttribute("disabled", "");
        itemListDiv.lastChild.appendChild(itemChk);
        const itemLabel = document.createElement("label");
        itemLabel.setAttribute("for", "itemChk_" + this.chkNum);
        itemListDiv.lastChild.appendChild(itemLabel);
        const itemText = document.createElement("div");
        itemText.setAttribute("class", "itemText");
        itemText.innerHTML =
          this._listDiv.childNodes[i].querySelector(".text").innerHTML;
        itemListDiv.lastChild.appendChild(itemText);

        if (
          this._listDiv.childNodes[i]
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
        this.chkNum++;
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
      trashI.parentElement.addEventListener("click", (e) => {
        this.trashing(trashI.parentElement, e);
      });

      item.addEventListener("click", () => {
        this.clickTodoItem(item);
      });

      this.modalClose();

      this._listDiv = null;
      this._modal = null;
      this._modalHeader = null;
      this._addModal = null;
      this._addListText = null;
    }
    this.masonry_layout();
  };

  // item 선택 모달
  clickTodoItem = (item) => {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    this._body.appendChild(modal);
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
    modalToday.innerHTML = document.querySelector("h1").innerHTML;
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

    this._itemListDiv = item.querySelector(".itemListDiv");
    this._addListText = addListText;
    this._listDiv = listDiv;

    for (let i = 0; i < this._itemListDiv.childElementCount; i++) {
      const list = document.createElement("div");
      list.setAttribute("class", "list");
      this._listDiv.appendChild(list);
      const chk = document.createElement("input");
      chk.setAttribute("type", "checkbox");
      chk.setAttribute("class", "chk");
      chk.setAttribute("id", "chk_" + this.chkNum);
      this._listDiv.lastChild.appendChild(chk);
      const label = document.createElement("label");
      label.setAttribute("for", "chk_" + this.chkNum);
      this._listDiv.lastChild.appendChild(label);
      const text = document.createElement("div");
      text.setAttribute("class", "selectText");
      text.innerHTML =
        this._itemListDiv.childNodes[i].querySelector(".itemText").innerHTML;
      this._listDiv.lastChild.appendChild(text);
      const iconBox = document.createElement("div");
      iconBox.setAttribute("class", "iconBox");
      this._listDiv.lastChild.appendChild(iconBox);
      const iconDiv1 = document.createElement("div");
      iconDiv1.setAttribute("class", "iconDiv");
      this._listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv1);
      const exclmI = document.createElement("i");
      exclmI.setAttribute("class", "fas fa-exclamation");
      this._listDiv.lastChild
        .querySelector(".iconBox")
        .firstChild.appendChild(exclmI);
      exclmI.parentElement.addEventListener("click", () => {
        this.exclming(exclmI.parentElement);
      });
      const iconDiv2 = document.createElement("div");
      iconDiv2.setAttribute("class", "iconDiv");
      this._listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv2);
      const trashI = document.createElement("i");
      trashI.setAttribute("class", "fas fa-trash-alt");
      this._listDiv.lastChild
        .querySelector(".iconBox")
        .lastChild.appendChild(trashI);
      trashI.parentElement.addEventListener("click", (e) => {
        this.trashing(trashI.parentElement, e);
      });
      if (this._itemListDiv.childNodes[i].querySelector(".itemChk").checked) {
        this._listDiv.childNodes[i].querySelector(".chk").checked = true;
        this._listDiv.childNodes[i]
          .querySelector(".chk")
          .nextElementSibling.nextElementSibling.classList.add("chking");
      } else {
        this._listDiv.childNodes[i].querySelector(".chk").checked = false;
        this._listDiv.childNodes[i]
          .querySelector(".chk")
          .nextElementSibling.nextElementSibling.classList.remove("chking");
      }

      if (
        this._itemListDiv.childNodes[i]
          .querySelector(".itemText")
          .classList.contains("exclming")
      ) {
        this._listDiv.childNodes[i]
          .querySelector(".selectText")
          .classList.add("exclming");
      } else {
        this._listDiv.childNodes[i]
          .querySelector(".selectText")
          .classList.remove("exclming");
      }
      chk.addEventListener("click", () => {
        this.chking(
          this._listDiv.childNodes[i].querySelector(".chk").nextElementSibling
            .nextElementSibling
        );
      });
      this.chkNum++;
    }

    const editItemBtn = document.createElement("button");
    editItemBtn.setAttribute("class", "editItemBtn");
    editItemBtn.innerHTML = "EDIT";
    article.appendChild(editItemBtn);

    this._modal = modal;

    selectAddListBtn.addEventListener("click", this.createEditMemoList);
    editItemBtn.addEventListener("click", this.createEditTodoItem);
    modalBg.addEventListener("click", this.modalClose);
  };

  // 선택 모달에 list 추가
  createEditMemoList = () => {
    if (!this.regex.test(this._addListText.value)) {
      setTimeout(() => {
        this._addListText.classList.add("errorAni");
      });
      this._addListText.classList.remove("errorAni");
      this._addListText.focus();
    } else {
      // list
      const list = document.createElement("div");
      list.setAttribute("class", "list");
      this._listDiv.appendChild(list);

      // chk
      const chk = document.createElement("input");
      chk.setAttribute("type", "checkbox");
      chk.setAttribute("class", "chk");
      chk.setAttribute("id", "chk_" + this.chkNum);
      this._listDiv.lastChild.appendChild(chk);

      // label
      const label = document.createElement("label");
      label.setAttribute("for", "chk_" + this.chkNum);
      this._listDiv.lastChild.appendChild(label);

      // text
      const textValue = this._addListText.value;
      const text = document.createElement("div");
      text.setAttribute("class", "selectText");
      text.innerText = textValue;
      this._listDiv.lastChild.appendChild(text);

      // iconBox
      const iconBox = document.createElement("div");
      iconBox.setAttribute("class", "iconBox");
      this._listDiv.lastChild.appendChild(iconBox);

      // exclamation
      const iconDiv1 = document.createElement("div");
      iconDiv1.setAttribute("class", "iconDiv");
      this._listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv1);
      const exclmI = document.createElement("i");
      exclmI.setAttribute("class", "fas fa-exclamation");
      this._listDiv.lastChild
        .querySelector(".iconBox")
        .firstChild.appendChild(exclmI);

      // trash
      const iconDiv2 = document.createElement("div");
      iconDiv2.setAttribute("class", "iconDiv");
      this._listDiv.lastChild.querySelector(".iconBox").appendChild(iconDiv2);
      const trashI = document.createElement("i");
      trashI.setAttribute("class", "fas fa-trash-alt");
      this._listDiv.lastChild
        .querySelector(".iconBox")
        .lastChild.appendChild(trashI);

      exclmI.parentElement.addEventListener("click", () => {
        this.exclming(exclmI.parentElement);
      });
      trashI.parentElement.addEventListener("click", (e) => {
        this.trashing(trashI.parentElement, e);
      });
      chk.addEventListener("click", () => {
        this.chking(this._listDiv.lastChild);
      });
      this.chkNum++;
    }

    this._addListText.value = "";
  };

  // 수정된 list를 item에 적용.(추가, 삭제, 체크)
  createEditTodoItem = () => {
    if (this._listDiv.childElementCount == 0) {
      setTimeout(() => {
        document.querySelector(".addModal").classList.add("errorAni");
      });
      document.querySelector(".addModal").classList.remove("errorAni");
      this._addListText.focus();
    } else {
      // 기존 item에 list 비우기
      while (this._itemListDiv.hasChildNodes()) {
        this._itemListDiv.removeChild(this._itemListDiv.firstChild);
      }
      // 새로운 list 추가
      for (let i = 0; i < this._listDiv.childElementCount; i++) {
        const itemList = document.createElement("div");
        itemList.setAttribute("class", "itemList");
        this._itemListDiv.appendChild(itemList);
        const itemChk = document.createElement("input");
        itemChk.setAttribute("type", "checkbox");
        itemChk.setAttribute("class", "itemChk");
        itemChk.setAttribute("id", "itemChk_" + this.chkNum);
        itemChk.setAttribute("disabled", "");
        this._itemListDiv.lastChild.appendChild(itemChk);
        const itemLabel = document.createElement("label");
        itemLabel.setAttribute("for", "itemChk_" + this.chkNum);
        this._itemListDiv.lastChild.appendChild(itemLabel);
        const itemText = document.createElement("div");
        itemText.setAttribute("class", "itemText");
        itemText.innerHTML =
          this._listDiv.childNodes[i].querySelector(".selectText").innerHTML;
        this._itemListDiv.lastChild.appendChild(itemText);
        if (this._listDiv.childNodes[i].querySelector(".chk").checked) {
          this._itemListDiv.childNodes[i].querySelector(
            ".itemChk"
          ).checked = true;
          this._itemListDiv.childNodes[i]
            .querySelector(".itemChk")
            .nextElementSibling.nextElementSibling.classList.add("chking");
        } else {
          this._itemListDiv.childNodes[i].querySelector(
            ".itemChk"
          ).checked = false;
          this._itemListDiv.childNodes[i]
            .querySelector(".itemChk")
            .nextElementSibling.nextElementSibling.classList.remove("chking");
        }
        if (
          this._listDiv.childNodes[i]
            .querySelector(".selectText")
            .classList.contains("exclming")
        ) {
          this._itemListDiv.childNodes[i]
            .querySelector(".itemText")
            .classList.add("exclming");
        } else {
          this._itemListDiv.childNodes[i]
            .querySelector(".itemText")
            .classList.remove("exclming");
        }
        this.chkNum++;
      }
      this.modalClose();

      this._itemListDiv = null;
      this._addListText = null;
      this._listDiv = null;
      this._modal = null;
    }
    this.masonry_layout();
  };

  // 모달 종료 및 데이터 리셋
  modalClose = () => {
    this._modal.remove();
  };

  // 선택 모달에 체크 박스 이벤트
  chking = (e) => {
    if (!e.classList.contains("chking")) {
      e.classList.add("chking");
    } else {
      e.classList.remove("chking");
    }
  };

  // 리스트 중요 표시 이벤트
  exclming = (e) => {
    const text = e.parentElement.previousSibling;
    if (!text.classList.contains("exclming")) {
      text.classList.add("exclming");
    } else {
      text.classList.remove("exclming");
    }
  };
  // 리스트 & 아이템 삭제 이벤트
  trashing = (icon, e) => {
    icon.parentElement.parentElement.remove();
    e.stopPropagation();
  };
}
