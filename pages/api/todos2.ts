//? 파일을 동기적으로 불러오는 함수. Promise사용이 불편하면 readFileSync를 사용해 파일데이터를 불러온다.
import { NextApiRequest,NextApiResponse } from "next";
import { TodoType } from '../../types/todo';
import fs from "fs"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        try {
            const todosBuffer = fs.readFileSync("data/todos.json");
            const todosString = todosBuffer.toString();
            if(!todosString){
                res.statusCode = 200;
                res.send([]);
            }
            const todos: TodoType[] = JSON.parse(todosString);
            res.statusCode = 200;
            return res.send(todos);
        }
        catch(e){
            console.log(e);
            res.statusCode = 500;
            res.send(e);
        }
    }
}