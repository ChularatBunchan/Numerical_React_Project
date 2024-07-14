import { evaluate } from "mathjs";
import { useState } from "react";
import { Button, Container, Table ,Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import './initial.css';

Chart.register(CategoryScale);
Chart.register(...registerables);

const Secant = () => {
  const [html, setHtml] = useState();
  const [equation, setEquation] = useState("(x^3)+1");
  const [x, setX] = useState();
  const [x0, setX0] = useState(0);
  const [x1, setX1] = useState(1);
  const [state, setState] = useState([]);
  const [data, setData] = useState([]);

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const Calsecant = (x0, x1) => {
    var f0, f1, ea, DF, DX, scope;
    var iter = 0;
    const e = 0.000001;
    var obj = {};

    do {
      iter++;
      scope = {
        x: x0,
      }
      f0 = evaluate(equation, scope)
      scope = {
        x: x1,
      }
      f1 = evaluate(equation, scope)

      DF = (f0 - f1) / (x0 - x1);
      DX = (-f1) / DF;
      x0 = x1;
      x1 += DX;
      obj = {
        Iteration: iter,
        x0: x0,
        x1: x1,
        f0: f0,
        f1: f1
      }
      data.push(obj)
      ea = error(x0, x1)
    } while (ea > e)
    setX(x1)

  }

  const calculateRoot = () => {
    const x0num = parseFloat(x0)
    const x1num = parseFloat(x1)
    Calsecant(x0num, x1num);
    setHtml(printTable());
    setState(data)
  }

  const inputX0 = (event) => {
    setX0(event.target.value)
  }

  const inputX1 = (event) => {
    setX1(event.target.value)
  }

  const inputEquation = (event) => {
    setEquation(event.target.value)
  }

  const dataX = [];
  const dataY = [];
  const g = () => {
    {
      data.map((element, index) => {
        dataX[index] = element.Iteration;
        dataY[index] = element.x1;
      })
    }
    console.log("dataX" + dataX);
    console.log("dataY" + dataY);

  }
  const datagrapgh = {
    labels: dataX,
    datasets: [
      {
        axis: 'y',
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
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th width="10%">Iteration</th>
              <th width="20%">X0</th>
              <th width="20%">f(X0)</th>
              <th width="20%">X1</th>
              <th width="20%">f(X1)</th>
            </tr>
          </thead>
          <tbody>
            {state.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.Iteration}</td>
                  <td>{element.x0}</td>
                  <td>{element.f0}</td>
                  <td>{element.x1}</td>
                  <td>{element.f1}</td>
                </tr>)
            })}
          </tbody>
        </Table>
        <Line data={datagrapgh} />
      </Container>
    );
  }

  return (
    <Container>
      <Form>
        <lebel>Input F(x)  </lebel>
        <input type="text" id="equation" value={equation} onChange={inputEquation} ></input><br></br><br></br>
        <lebel> Input X0 </lebel>
        <input type="number" id="X0" value={x0} onChange={inputX0} ></input><br></br><br></br>
        <lebel> Input X1 </lebel>
        <input type="number" id="X1" value={x1} onChange={inputX1} ></input><br></br><br></br>
        <Button onClick={calculateRoot}>Calculate</Button>
        <br></br> <br></br>
        <h5>Answer = {x}</h5><br></br> <br></br>
        <Container>
          {html}
        </Container>
      </Form>

    </Container>
  )
}

export default Secant