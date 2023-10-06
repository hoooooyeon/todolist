# ToDoList
'Google Keep' 을 토대로 제작한 메모 형식의 ToDoList.

## 1. 제작 기간 & 참여 인원
- 2022년 06월 01일 ~ 2022년 07월 12일
- 개인 프로젝트
  
## 2. 사용 기술
- Vanilla JS

## 3. 링크

## 4. 업데이트
- index.js에 합쳐져 있던 modal과 nav 함수들을 modal.js와 nav.js로 분리시켰다. (23.09.06)

## 5. 사용 방법
1. 네비게이션 바에 ToDo 버튼을 눌러 모달을 생성한다.<br>
2. 생성된 모달에 text를 입력하고 ADD 버튼을 눌러 할 일 목록을 추가한다.<br>
3. Confirm 버튼을 눌러 ToDoItem을 생성한다.<br>
4. 생성 돼 있는 ToDoItem을 선택하여 해당 ToDoItem을 편집할 수 있다.<br>
5. ToDoList는 Masonry 레이아웃 형식이다.<br>

## 6. 핵심 기능
### 6.1. ToDoItem 
// 영상 or 이미지
- 할 일 목록을 입력하고 이를 ToDoList로 만든다.
- 할 일 목록 중 완료하거나 중요 표시 효과를 줄 수 있다.

<details>
<summary>Code</summary>
<div markdown="1">
  
```
// modal.js

```

</div>
</details>


### 6.2. Masonry Layout
// 영상
- 벽돌이 쌓이듯이 빈 공간이 없도록 ToDoList를 배치시키는 Masonry Layout 구현

<details>
<summary>Code</summary>
<div markdown="1">
  
```
// index.js
function masonry_layout() {
  const items = document.querySelectorAll(".item");

  items.forEach((e) => {
    e.style.gridRowEnd = null;
    e.style.gridRowEnd = `span ${Math.ceil(e.offsetHeight / 10)}`;
  });
}
```
```
// index.css
main .container {
(...)
  display: grid;
  grid-template-columns: repeat(auto-fill, 284px);
  gap: 10px;
  grid-auto-flow: dense;
}
```
  
</div>
</details>

## 7. 기타 기능
- 네비게이션 바

## 8. 트러블 슈팅
<details>
<summary>Masonry layout 구현</summary>
<div markdown="1">
  
- masonry layout을 라이브러리 없이 구현하는 데 어려움이 있었다.
- 목표한 대로 layout을 구현하는 데 성공하였지만, 페이지 크기를 조절하는 과정에서 배치가 제대로 안 되는 상황이 발생했다.
- 이를 방지하기 위해, grid-row-end 속성에 값을 할당하기 전에 `e.style.gridRowEnd = null;` 코드를 추가하여 초기화 시키므로 해결하였다.
  
</div>
</details>

## 9. 회고 & 느낀점
본격적으로 JS를 공부하고 처음으로 제작한 프로젝트였다. 어떤 웹사이트를 만들지 고민하다가 그래도 가장 기본적인 todolist는 만들어 봐야 하지 않을까 하고, 평소에 자주 사용하던 google keep 웹사이트를 토대로 제작하였다.
내가 사용하던 웹사이트를 직접 만들어 보고 사용했을 때의 즐거움이 개발이라는 공간에 나를 한 발짝 더 가까이 다가가게 해주었다.
아직 미숙하고 난잡하다고 느껴지는 코드들이지만 제작하면서 닥친 어려움에 고민했던 과정들이 좋은 경험이 된 것 같다. 
앞으로의 프로젝트는 어떤 코드가 좋은 코드일지 좀 더 고민해보면서 제작해야겠다고 생각했다.

(사실 프로젝트는 예전에 만들었고 인제야 README를 작성한다. 프로젝트를 제작과 동시에 작성해야 한다는 걸 너무 늦게 알아버린 것 같다. 하지만 이제라도 앞으로 제작하는 프로젝트는 그 과정을 상세히 기록해야겠다.)


