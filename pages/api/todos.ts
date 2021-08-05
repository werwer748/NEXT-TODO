import { NextApiRequest,NextApiResponse } from "next";
import { TodoType } from '../../types/todo';
import fs from "fs"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        try {
            const todos = await new Promise<TodoType[]>((resolve, reject)=>{
                fs.readFile("data/todos.json", (err, data)=> {
                    if(err){
                        return reject(err.message);
                    }
                    const todosData = data.toString(); //!신기하게 else따위 안씀
                    if(!todosData){
                        //* todos.json값이 비었을 경우
                        return resolve([]);
                    }
                    const todos = JSON.parse(data.toString());
                    return resolve(todos);
                })
            });
            res.statusCode = 200;
            return res.send(todos);
        }
        catch(e){
            console.log(e);
            res.statusCode=500;
            res.send(e);
        }
    }
}