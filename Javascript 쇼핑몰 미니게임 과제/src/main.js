//JSON 파일로부터 item 데이터 받아오기
function loadItems(){
    return fetch('data/data.json') //fetch로 데이터 받아옴
    .then(response =>response.json()) //데이터 받아오기 성공시(배열형식 쭉 이어진 문자열로 받아옴, 읽을 수 없음), js으로 변환(데이터 읽을 수 있음) :데이터 파싱
    .then(json=>json.items); //js 형태로 변경된 json안의 items 데이터 받아옴
}

//json의 items 를 받아와서 html로 변환해서 page에 표시되도록
function displayItems(items){
    const container =document.querySelector('.items');//현재 페이지에서 <ul class="items">요소 찾아 container변수에 저장
    container.innerHTML = items.map(item => createHTMLString(item)).join('');//container의 html파일 내용 업데이트할것임 =(뭘 업데이트 할 거냐) item 내용을 html li형태로 변환해서 매핑(마지막에 각 요소를 큰 list로 묶음)
}

//주어진 데이터중 item 내용 HTML리스트로 만들기
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">"${item.gender}","${item.size}"</span>
      </li>
    `;
}

function onButtonClick(event, items){

    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key==null||value==null){
        return; //함수 끝냄
    }

    const filtered = items.filter(item => item[key] === value);//불러온 item의 배열에서 조건에 맞는 요소들만 새로운 작은 배열로 반환 item/조건- item의 속성이 value와 같나(ex. 파란색바지 찾기)
    displayItems(filtered);//

    console.log(event.target.dataset.key);//event(클릭시 발생함) 의 클릭된 그target(클릭한 실제html요소)의 dataset의 key내용을 출력
    console.log(event.target.dataset.value);


}

//클릭시 동작 처리
function setEventListeners(items){
    const logo = document.querySelector('.logo');//html에서 class 가 logo인 것들찾아 logo에 저장
    const buttons = document.querySelector('.buttons');//html에서 class 가 buttons인 것들찾아 buttons에 저장
    logo.addEventListener('click',() => displayItems(items));//logo 클릭시 displayItems함수 실행
    buttons.addEventListener('click', event => onButtonClick(event, items));//button,클릭시실행함수연결, event(어떤버튼 클릭?)라는 정보 받아서 item와 함께 onbuttonClick에 넘김
}

//main
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
    setEventListeners(items)
})

.catch(console.log)