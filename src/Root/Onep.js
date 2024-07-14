import React from 'react';
import { evaluate, abs } from "mathjs";
import { useState } from "react";
import { Button, Container,  Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './initial.css';

Chart.register(CategoryScale);
Chart.register(...registerables);

const Onep = () => {

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState('e^(x-4)*(2-x)-1')
    const [X, setX] = useState();
    const [X0, setX0] = useState();
    const data =[];
    const [state, setState] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valuegX0, setValuegX0] = useState([]);
    const [valuegX1, setValuegX1] = useState([]);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }


    const error =(xold, xnew)=> abs((xnew-xold)/xnew)*100;

    const Calonepoint = (x0) => {
        var gx0,gx1,ea,scope,
        x1 = 0,iter = 0,MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            gx0 = evaluate(Equation, scope)
            x1 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            gx1 = evaluate(Equation, scope)
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                gX0:gx0,
                gX1:gx1
            }
            data.push(obj)
            ea = error(x0, x1);
            x0 = x1;
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        Calonepoint(x0num);

        setHtml(print());
        console.log(valueIter)
        console.log(valueX1)

        setState(data)

    }

    const dataX=[];
    const dataY=[];
    const g = () => {
    {
        data.map((element,index) =>{
        dataX[index]= element.Iteration;
        dataY[index]= element.gX0;
        })   }
        console.log("dataX"+dataX); 
        console.log("dataY"+dataY); 

    }
    const datagrapgh={
        labels : dataX,
        datasets:[
            {
                axis:'y',
                label: 'Answer',
                data: dataY,
                borderColor: 'black',
                fill: false,
                tension: 0.1
            }
        ]
    };
    const print = () =>{
        console.log(data)
        g();
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValuegX0(data.map((x)=>x.gX0));
        setValueX1(data.map((x)=>x.X1));
        setValuegX1(data.map((x)=>x.gX1));

        return(
            <Container>
                 <Table>
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="20%">X0</th>
                            <th width="20%">g(X0)</th>
                            <th width="20%">X1</th>
                            <th width="20%">g(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.gX0}</td>
                                <td>{element.X1}</td>
                                <td>{element.gX1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={datagrapgh}/>
            </Container>
        );
    }

    return(
        <Container>
            <form> 
                <label> Input F(x) </label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} ></input><br></br><br></br>
                <label> Input X0   </label>
                <input type="number" id="X0" value={X0} onChange={inputX0} ></input>
                <br></br><br></br>
                <Button onClick={calculateRoot}>Calculate</Button>
                <br></br><br></br>
                <h5>Answer = {X}</h5>
                <Container>
                {html}
                </Container>
            </form> 
        </Container>
        );
    }

export default Onep