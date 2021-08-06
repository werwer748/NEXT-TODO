import { readFileSync, writeFileSync } from "fs";
import todos from "../../pages/api/todos";
import { TodoType } from "../../types/todo";

//* 투두리스트 데이터 불러오기!
const getList = () => {
    const todosBuffer = readFileSync("data/todos.json");
    const todosString = todosBuffer.toString();
    if(!todosString){
        return [];
    }
    const todo: TodoType[] = JSON.parse(todosString);
    return todo;
};

//* 해당 id의 투두를 불러옴
const exist = ({id}:{id: number})=> {
    const todos = getList();
    const todo = todos.some((todo)=> todo.id === id);
    return todo;
}

//* 투두리스트 저장하기
const write = async (todos: TodoType[]) => {
    writeFileSync("data/todos.json", JSON.stringify(todos));
}

export default { getList, exist, write }