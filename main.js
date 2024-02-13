// 유저가 할일 추가
// 각 할일에 삭제, 완료 버튼
// 삭제 클릭 시 할일이 리스트에서 삭제
// 체크(완료)버튼 클릭시 완료된 것으로 간주하고 스트라이크 표시
// 끝난 할일은 되돌리기(완료 취소) 버튼을 클릭하면 다시 되돌아간다
// 탭을 이용해 아이템을을 상태별로(완료, 미완료 등등) 나누어서 볼 수 있다
// 모바일에서도 확인 가능한 반응형 웹

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-Btn");
let taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    viewTask();
}

function viewTask() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task"> <div> ${taskList[i]} </div> <div> <button>Check</button> <button>Delete</button> </div> </div>`;
        console.log(i,taskList[i] );
        document.getElementById("task-board").innerHTML = resultHTML;
    }


}