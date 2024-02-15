// 유저가 할일 추가
// 각 할일에 삭제, 완료 버튼
// 삭제 클릭 시 할일이 리스트에서 삭제
// 체크(완료)버튼 클릭시 완료된 것으로 간주하고 스트라이크 표시
// 1. check 클릭 시 true false
// 2. true면 끝난 걸로 간주하고
// 3. false면 안끝난
// 끝난 할일은 되돌리기(완료 취소) 버튼을 클릭하면 다시 되돌아간다
// 탭을 이용해 아이템을을 상태별로(완료, 미완료 등등) 나누어서 볼 수 있다
// 모바일에서도 확인 가능한 반응형 웹


/// 휴지통 복원 아이템, 비우기 아이템
/// 검색은 내일 작업

////추후 업데이트: 날짜(작성 날짜, 예약 날짜), 태그
////정렬 기능 (날짜 오름차, 내림차, 태스크 오름차, 내림차) - 이 기능 구현 및 퍼포먼스 향상을 위해 map 공부 필요(객체를 맵으로 바꿔서 제작)
////검색 기능 - 이 기능 구현을 위해 set 공부 필요
////메모리 관리 필요 - 변수가 필요한 구간/인수가 필요한 구간/루프 최소화, 조건 확인 즉시 브레이크/삭제는 delete보다 undefined로

let taskInput = document.getElementById("task-input");
let enterCheck = document.querySelector('input[type="text"]')
let addBtn = document.getElementById("add-Btn");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addBtn.addEventListener("click", addTask);


for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: genRandomID(),
    taskContent: taskInput.value,
    isComplete: false,
    inTrash: false,
  };
  taskList.push(task);
  console.log("input:", taskList);
  viewTask();
  let input = document.getElementById("task-input");
  input.value = null;
}

function viewTask() {
  let list = [];

  if (mode === "all") {
    list = taskList;
    console.log("mode", mode);
 // } else if (mode === "clear") {
 //   list = [];
  } else {
    list = filterList;
    console.log("list", list);
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].inTrash == true && mode != "trash" ) {
      resultHTML += `<div class="task-deleted"> </div>`;
      //continue;
    } else if (list[i].isComplete == true) {
      resultHTML += `<div class="task-done">
         <div> ${list[i].taskContent} </div> 
         <div class="button-box"> 
         <button id="done-button" onclick="toggleComplete('${list[i].id}')"><img src="/img/complete.jpg" /></button> 
         <button id="trash-box" onclick="toTrash('${list[i].id}')"><img src="/img/trash-delete.png" /></button> 
         </div> 
         </div>`;
    } else if (list[i].isComplete == false) {
      resultHTML += `<div class="task">
         <div> ${list[i].taskContent} </div> 
         <div class="button-box">  
         <button id="undone-button" onclick="toggleComplete('${list[i].id}')"><img src="/img/uncomplete.png" /></button> 
         <button id="trash-box" onclick="toTrash('${list[i].id}')"><img src="/img/trash-delete.png" /></button> 
         </div> 
         </div>`;
    }
    console.log(i, list[i]);
    document.getElementById("task-board").innerHTML = resultHTML;
  }
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    // 이 부분 추후 find로 대체 후 성능 테스트
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  viewTask();
  console.log(taskList);
}

function genRandomID() {
  return "_" + Math.random().toString(36).substr(2, 16);
}

function toTrash(id) {
  for (let i = 0; i < taskList.length; i++) {
    // 이 부분 추후 find로 대체 후 성능 테스트
    if (taskList[i].id == id) {
      taskList[i].inTrash = !taskList[i].inTrash;
      break;
    }
  }
  viewTask();
  console.log(taskList);
}

function filter(event) {  
  mode = event.target.id;
  filterList = [];
  console.log(mode);
  if (mode === "all") {
    filterList = taskList;
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "trash") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].inTrash === true) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "search") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  }
  viewTask();
}

function clearTaskArea() {
  mode = "clear";
  viewTask();
}

// function enterkey(event) {
//  if (event.keycode == 13) {
    // addTask();
  // }
// }