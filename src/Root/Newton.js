import { derivative, evaluate } from "mathjs";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './initial.css';

Chart.register(CategoryScale);
Chart.register(...registerables);

const Newton = () => {
  const [html, setHtml] = useState(); 
  const [equation, setEquation] = useState("e^(x-4)*(2-x)-1"); 
  const [equationDiff, setEquationDiff] = useState(" " + derivative(equation, 'x')); 
  const [x, setX] = useState(); 
  const [x0, setX0] = useState(5); 
  const [state, setState] = useState([]);
  const [data, setData] = useState([]); 

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const calNewton = (x0) => {
    var x1, f0, f0diff, ea, scope;
    var iter = 0;
    const e = 0.000001;
    var obj = {};
    do {
      iter++;
      scope = {
        x: x0,
      }
      f0 = evaluate(equation, scope)
      f0diff = evaluate(equationDiff, scope)
      x1 = x0 - (f0 / f0diff)
      obj = {
        iteration: iter,
        x0: x0,
        f0: f0,
        f0diff: f0diff,
        x1: x1
      }
      data.push(obj)// pushing new object to the state array
      ea = error(x0, x1)
      x0 = x1
    } while (ea > e)

  }

  const calculateRoot = () => {
    const x0num = parseFloat(x0)
    calNewton(x0num);
    setHtml(printTable()); // displaying the table
    setState(data)
  }

  const inputX0 = (event) => {
    setX0(event.target.value)
  }

    const dataX=[];
    const dataY=[];
    const g = () => {
    {
        data.map((element,index) =>{
        dataX[index]= element.iteration;
        dataY[index]= element.f0;
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

  const printTable = () => {
    g();
    setX(data[data.length - 1].x1); // setting the root value to the last element of the data array
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th width="10%">Iteration</th>
              <th width="20%">X0</th>
              <th width="20%">f(x) = {equation}</th>
              <th width="20%">f'(x) = {equationDiff}</th>
              <th width="20%">X1</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.x0}</td>
                  <td>{element.f0}</td>
                  <td>{element.f0diff}</td>
                  <td>{element.x1}</td>
                </tr>)
            })}
          </tbody>
        </Table>
        <Line data={datagrapgh}/>
      </Container>
    );
  }

  return (
    <Container>
      <form>
        <lebel>Input F(x)  </lebel>
        <input type="text" id="equation" value={equation} onChange={ew => { setEquation(ew.target.value); setEquationDiff("" + derivative(equation, 'x')); }} ></input><br></br><br></br>
        <lebel> Input X0 </lebel>
        <input type="number" id="X0" value={x0} onChange={inputX0} ></input><br></br><br></br>
        <Button onClick={calculateRoot}>Calculate</Button>
        <br></br> <br></br>
        <h5>Answer = {x}</h5><br></br> <br></br>
        <Container>
          {html}
        </Container>
      </form>

    </Container>
  )
}

export default Newton