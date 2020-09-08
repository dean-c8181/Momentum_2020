const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');


const TODOS_LS = 'toDos';

let toDos = [];

// todo삭제
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    // 구조삭제
    toDoList.removeChild(li);

    //LS삭제
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
    //finlter는 array(배열)의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만들어서 return한다.

    /* 
    console.dir(event.target)로 부모(parentsNode)를 찾는다.
    delete child eliment MDN
    */
    
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // localStorage는 JVS의 모든 데이터를 string으로 저장해야 정상적으로 작동한다.
}

function paintToDo(text){       // todo인풋 입력시 작동
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = '❌';
    delBtn.addEventListener('click', deleteToDo); // 삭제기능
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    // localStorage 저장용작업
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';       // 엔터 입력시 입력값들 제거
};

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // localStrage의 데이터를 string에서 다시 array(배열)로 바꿈 console.log(parsedToDos);

        parsedToDos.forEach(function(toDo){  // forEach는 array의 function임
            paintToDo(toDo.text);
            //console.log(toDo.text);
            //여기서의 toDo는 앞에 parsedToDos가 자동으로 들어가는 것 같음. forEach에서 function의 parameter는 의미없음--(여기에선)
        })
    };
};

function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
};

init();