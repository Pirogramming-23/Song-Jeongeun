//게임 초기화
// a. 입력 숫자 확인버튼 누르면 시도가능횟수-1
// b. 랜덤 3 숫자(중복x)
// c. html의 input과 결과창 내용 비움 
//숫자 확인
//check_numbers()구현
// 1. 세 숫자 다 입력되지 않으면 나오기, input창만 비우기
// 2. 세 숫자 다 입력되었으면
//  a. 숫자, 위치 비교하기 (o,o-s//o,x-b//x,x-O)
//  b. html 업데이트
//  c. 맞추거나, 9번 넘으면- 버튼 비활성화 and 승리,실패 이미지 출력(<div class="game-result">)


let answer=[];
let attempts=9;

//init


function initGame(){
    //랜덤 수 생성 함수
    answer=generateRandomNumbers();
    //input 초기화
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("number3").value = "";
    //이미지 초기화
    document.getElementById("game-result-img").src = "";
    //시도 결과 메시지 초기화
    document.getElementById("results").innerHTML = "";
    //시도 횟수 초기화
    attempts = 9;
    document.getElementById("attempts").textContent = attempts;
    //버튼 활성화
    const button = document.querySelector(".submit-button");
    button.disabled = false;
    button.classList.remove("disabled");
    
}

//랜덤 수 생성 함수
function generateRandomNumbers() {
    const numbers = [];

    while (numbers.length < 3) {
        const rand = Math.floor(Math.random() * 10);
        if (!numbers.includes(rand)) {
            numbers.push(rand);
        }
    }

    return numbers;
}

function check_numbers() {
    const n1 = document.getElementById("number1").value;
    const n2 = document.getElementById("number2").value;
    const n3 = document.getElementById("number3").value;

    // 입력 유효성 검사
    if (n1 === "" || n2 === "" || n3 === "") {
        clearInputs();
        return;
    }

    const guess = [Number(n1), Number(n2), Number(n3)];
    let strike = 0;
    let ball = 0;

    // 정답, 입력값 비교
    for (let i = 0; i < 3; i++) {
        if (guess[i] === answer[i]) {
            strike++;
        } 
        else if (answer.includes(guess[i])) {
            ball++;
        }
    }

    
  // DOM 생성
  const resultRow = document.createElement("div");
  resultRow.className = "check-result";

  const left = document.createElement("div");
  left.className = "left";
  guess.forEach(num => {
    const span = document.createElement("span");
    span.className = "num-result";
    span.textContent = num;
    left.appendChild(span);
  });

  const right = document.createElement("div");
  right.className = "right";

  if (strike === 0 && ball === 0) {
    const outSpan = document.createElement("span");
    outSpan.className = "out num-result";
    outSpan.textContent = "O";
    right.appendChild(outSpan);
  } else {
    for (let i = 0; i < strike; i++) {
      const s = document.createElement("span");
      s.className = "strike num-result";
      s.textContent = "S";
      right.appendChild(s);
    }
    for (let i = 0; i < ball; i++) {
      const b = document.createElement("span");
      b.className = "ball num-result";
      b.textContent = "B";
      right.appendChild(b);
    }
  }

  resultRow.appendChild(left);
  resultRow.appendChild(right);
  document.getElementById("results").appendChild(resultRow);

    // 게임 종료 조건 확인
    if (strike === 3) {
        gameOver(true);
        return;
    }

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (attempts === 0) {
        gameOver(false);
    }

    clearInputs();
}

function clearInputs() {
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("number3").value = "";
    document.getElementById("number1").focus();
}

function gameOver(isWin) {
    const img = document.getElementById("game-result-img");
    const button = document.querySelector(".submit-button");

    if (isWin) {
        img.src = "success.png";
        
    } else {
        img.src = "fail.png";
    }
    button.disabled = true;
    button.classList.add("disabled");


}

window.onload = function () {
  initGame(); 
};