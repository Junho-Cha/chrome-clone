const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector(".js-todoInput"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    idNumbers = 1;
    cleanToDos.forEach(function(toDo){
        toDo.id = idNumbers;
        paintToDo(toDo.text); //내부 id도 idNum으로 지정됨.
        //paintToDo가 실행된 후 idNumbers += 1;이 실행되기 때문에 추가로 실행하지 않음.
    });
    toDos = cleanToDos;
    saveToDos();
} 

function saveToDos(){// JSON=JavaScript-Object-Notation
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON을 이용하여 로컬스토리지에 String 형식으로 저장한걸 Object로 바꿈
}

let idNumbers = 1;

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers++;//id 1만큼 증가
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn); //appendChild 부모에 자식을 심어줌 - (li에 delBtn을 담아준다.)
    li.appendChild(span);
    li.id = newId;//리스트에 id 생성
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();//제출 디폴트값을 없앰
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //엔터 누른 후 input에 남아있는 text를 없앰 제출버튼과 비슷한 기능
}

function loadToDos(){//로컬스토리지에 투두리스트를 저장
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);//JSON을 이용하여 String을 Object 형식으로 다시 변환한다.
        parsedToDos.forEach(function(toDo){//forEach=parsedToDos에 있는 각각에 대해 함수를 실행
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();