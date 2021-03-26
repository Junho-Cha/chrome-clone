const body = document.querySelector("body");

const IMG_NUMBER = 7; //랜덤값을 3으로 지정

function handleImgLoad(image){
    console.log("image load complete");
    image.classList.add("bgImage"); //css로 조정하기 위해 class 추가
    body.prepend(image); //body를 image에 들어가게 함.
}

function paintImage(imgNumber){
    const image = new Image(); //변수 설정
    image.src = `images/${imgNumber + 1}.jpg`; //랜덤숫자 0,1,2에 +1 해준다.
    image.addEventListener("load", handleImgLoad(image));
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); //random시에 숫자는 0,1,2  3개로 카운트
    return number; //리턴을 해야 해당 함수가 실행 후 중단된다.
}

function init(){
    const randomNumber = genRandom(); //랜덤 함수의 결과를 변수로 지정
    paintImage(randomNumber); //위의 랜덤 값을 paint함수 변수값으로 넣어준다.
}

init();