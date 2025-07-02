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

//main
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
   // setEventListeners(itmes)
})

.catch(console.log)