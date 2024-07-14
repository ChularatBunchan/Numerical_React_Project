import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './initial.css';

Chart.register(CategoryScale);
Chart.register(...registerables);

const Bisection =()=>{
    const dataX=[];
    const dataY=[];
    const g = () => {
    {
        data.map((element,index) =>{
        dataX[index]= element.Iteration;
        dataY[index]= element.x1;
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
        setValueIterr(data.map((x)=>x.Iteration));
        setValuexxl(data.map((x)=>x.xxl));
        setValuex1(data.map((x)=>x.x1));
        setValuexxr(data.map((x)=>x.xxr));
        return(
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.xxl}</td>
                                <td>{element.x1}</td>
                                <td>{element.xxr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={datagrapgh}/>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var x1,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            x1 = (xl+xr)/2.0;
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:x1,
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, x1);
                obj = {
                    Iteration:iter,
                    xxl:xl,
                    x1:x1,
                    xxr:xr
                }
                data.push(obj)
                xr = x1;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, x1);
                obj = {
                    Iteration:iter,
                    xl:xl,
                    x1:x1,
                    xxr:xr
                }
                data.push(obj)
                xl = x1;
            }
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const data =[];
    const [valueIterr, setValueIterr] = useState([]);
    const [valuexxl, setValuexxl] = useState([]);
    const [valuex1, setValuex1] = useState([]);
    const [valuexxr, setValuexxr] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIterr)
        console.log(valuexxl)
    }

    return (
            <Container>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)      </Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control" required></input><br /><br />
                        <Form.Label>Input XL    </Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control" required></input><br /><br />
                        <Form.Label>Input XR    </Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control" required></input><br /><br />
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5 className="Answer">Answer = {X.toPrecision(7)}</h5>
                <Container className="Isolation">
                {html}
                </Container>
            </Container>
           
    )
}

export default Bisection