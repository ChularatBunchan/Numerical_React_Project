import { useState} from "react"
import { Button, Container, Table } from "react-bootstrap"
import { evaluate, derivative, abs , floor ,random} from 'mathjs'
import { CategoryScale, Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"
import './initial.css'
import '../server'
import axios from 'axios'

Chart.register(CategoryScale);
Chart.register(...registerables);

const Final = () => {
  const data = [];
  const [i, setIter] = useState();
  const [fx, setfx] = useState();
  const [html, setHtml] = useState();
  const [equation, setEquation] = useState('x^7 - 13x')
  const [x, setx] = useState()
  const [check, setCheck] = useState()
  const [dx, setdx] = useState()
  const [x0, setx0] = useState()

  const [FFx, setFFx] = useState()
  const [XX0, setXX0] = useState()
  
  axios.get('http://localhost:3033/data/1')
      .then(response => {
        setEquation(response.data.fx);
        setx0(response.data.x0);
      }).catch((error) => {
        console.log(error);
      })

    // const getData = () => {
    //   axios.post('http://localhost:3033/data')
    //   .then(response => {
    //     let item = response.data[floor(random() * responsedata.length)]
    //     setEquation(item.fx);
    //     setx0(item.x0);
    //   })
    // }


  const er = (xold, xnew) => abs((xnew - xold) / xnew) * 100;
  const calNewton = (x0) => {
    var fx, difffx, ea, scope, x, i = 0, MAX = 50;
    const e = 0.000000001;
    var obbject = {};
    const cal = (x) => {
      scope = {
        x: x0,
      }
      return evaluate(equation, scope)
    }
    const diff = (x) => {
      scope = {
        x: x0,
      }
      const df = derivative(equation, 'x').toString()
      return evaluate(df, scope)
    }
    do {
      i++;
      fx = cal(x0);
      difffx = diff(x0);
      x = x0 - fx / difffx;
      ea = er(x, x0)
      obbject = {
        iteration: i,
        x: x0,
        error: ea
      }
      data.push(obbject)
      x0 = x;
    } while (ea > e && i < MAX)
    setCheck(cal(x0))
    setx(x0)
    console.log("check", check)
    setdx(derivative(equation, 'x'))
  }

  const inputEquation = (event) => {
    console.log(event.target.value)
    setEquation(event.target.value)
  }

  const inputx0 = (event) => {
    console.log(event.target.value)
    setx0(event.target.value)
  }

  const calculate = () => {
    const x0num = parseFloat(x0);
    calNewton(x0num);
    setHtml(print());
  }

  const dataX = [];
  const dataY1 = [];
  const dataY2 = [];

  const g = () => {
    {
      data.map((element, index) => {
        dataX[index] = element.iteration;
        dataY1[index] = element.error;
        dataY2[index] = element.x;

      })
    }
    console.log("dataX" + dataX);
    console.log("dataY1" + dataY1);
    console.log("dataY2" + dataY2);

  }
  const datagrapgh = {
    labels: dataX,
    datasets: [
      {
        label: 'Error',
        data: dataY1,
        borderColor: "#3EB489",
        fill: false,
        pointstyle: "circle",
        pointreduis: 10,
      }, {
        label: 'X0',
        data: dataY2,
        borderColor: "#4D5D53",
        fill: false
      }
    ]
  };

  const print = () => {
    g()
    setIter(data.map((x) => x.iteration));
    setx0(data.map((x) => x.x));
    setfx(data.map((x) => x.error));
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th width="10%">Iteration</th>
              <th width="30%">x0</th>
              <th width="30%">Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.x}</td>
                  <td>{element.error}</td>
                </tr>)
            })}
          </tbody>
        </Table>
        <Line data={datagrapgh} ></Line>
      </Container>
    );
  }

  return (
    <Container>
      <form>
        <lebel>Input F(x)  </lebel>
        <input type="text" value={equation} onChange={inputEquation}></input><br></br><br></br>
        <lebel> Input X0 </lebel>
        <input type="number" value={x0} onChange={inputx0} ></input><br></br><br></br>
        <lebel> Diff </lebel>
        <input type="text" value={dx} readOnly></input><br></br><br></br>
        <Button onClick={calculate}>Calculate</Button>
        {/* <Button onClick={getData}>Random for API</Button> */}
        <br></br> <br></br>
        <h5>Answer = {x}</h5><br></br>
        <h5>check  {equation}  = {check}</h5><br></br>
        <Container>
          {html}
        </Container>
      </form>
    </Container>
  )
}

export default Final