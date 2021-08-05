import { GetServerSideProps, NextPage } from "next";
import React from "react";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todo";

const todos: TodoType[] = [
    {"id":1,"text":"마트가서 장보기","color":"red","checked":false},
    {"id":2,"text":"수학 숙제하기","color":"orange","checked":false},
    {"id":3,"text":"요리 연습하기","color":"blue","checked":false},
    {"id":4,"text":"분리수거 하기","color":"navy","checked":true},
    {"id":5,"text":"마트가서 장보기","color":"green","checked":true},
    {"id":6,"text":"마트가서 장보기","color":"yellow","checked":false}
]

const app: NextPage = () => {
    return <TodoList todos={todos}/>;
}

export const getServerSideProps: GetServerSideProps = async()=>{
    try{
        const { data } = await getTodosAPI();
        console.log('데이타',data)
        return { props: {} };
    }
    catch(e){
        console.log(e);
        return { props:{} };
    }
}

export default app;
