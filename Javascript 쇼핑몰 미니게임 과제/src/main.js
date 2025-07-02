//Fetch the items from the JSON file
function loadItems(){
    return fetch('data/data.json') //fetch로 데이터 받아옴
    .then(response =>response.json()) //데이터 받아오기 성공시(배열형식 쭉 이어진 문자열로 받아옴, 읽을 수 없음), js으로 변환(데이터 읽을 수 있음) :데이터 파싱
    .then(json=>json.items); //json안의 데이터 받아옴
}

//main
loadItems()
.then(items => {
    console.log(items);
   // displayItems(item);
   // setEventListeners(itmes)
})
.catch(console.log)