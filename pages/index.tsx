import { GetServerSideProps, NextPage } from "next";
import React from "react";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from '../store/index';

interface IProps {
    todos: TodoType[];
}

const app: NextPage<IProps> = ({todos}) => {
    return <TodoList todos={todos}/>;
}

export const getServerSideProps: GetServerSideProps = async()=>{
    try{
        const { data } = await getTodosAPI();
        // console.log('데이타',data)
        return { props: { todos: data } };
    }
    catch(e){
        console.log(e);
        return { props:{ todos: [] } };
    }
}

export default app;
