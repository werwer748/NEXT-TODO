import { NextApiRequest,NextApiResponse } from "next";
import { TodoType } from '../../../types/todo';
import fs from "fs"
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        try {
            const todos = Data.todo.getList();
            res.statusCode = 200;
            return res.send(todos);
        }
        catch(e){
            console.log(e);
            res.statusCode=500;
            res.send(e);
        }
    }

    if(req.method === "POST"){
        //* 값을 받았는지 확인
        const { text, color } = req.body;
        if(!text || !color){
            res.statusCode = 400;
            return res.send("컬로도 선택하고 메모도 남겨라");
        }
        const todos = Data.todo.getList();
        
        let todoId: number;
        if(todos.length > 0){
            //* 마지막 투두 id + 1
            todoId = todos[todos.length - 1].id + 1;
        }
        else {
            todoId = 1; //? 나중에 else 없애봐야겠다.
        }

        const newTodo = {
            id: todoId,
            text,
            color,
            checked: false
        };

        Data.todo.write([...todos, newTodo]);
        res.statusCode = 200;
        res.end();
    }
}