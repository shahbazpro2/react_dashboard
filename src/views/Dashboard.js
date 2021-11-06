/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

import chartsData from '../output.json'
import PerChart from './charts/PerChart';
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import output from "../output.json";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = useState("data2");
  const [monthlyData, setMonthlyData] = useState({ labels: [], values: [] })
  const [weeklyData, setWeeklyData] = useState({ labels: [], values: [] })
  const [customData, setCustomData] = useState({})

  const history = useHistory()
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  useEffect(() => {
    if (!!sessionStorage.getItem('login') !== true) {
      history.push('/login')
    }
  }, [])

  useEffect(() => {
    const socket = io("http://127.0.0.1:8000");

    setInterval(function () {
      socket.emit('getData');
    }, 10) // 10 millseconds

    socket.on("data", d => {
      console.log('table', d)
      setCustomData(d)
    })
    socket.on('disconnect', (e) => {
      console.log('disconnected')
    });
    socket.on('connect', (e) => {
      console.log('connected')
    });
  }, [])

  /* useEffect(()=>{
    const socket = io("http://localhost:3000");
    socket.emit('subscribe_to_data',"hello")
    socket.on("my event",data=>console.log(data))
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
    socket.on('disconnect', () => {
      console.log('disco')
    });
  },[]) */
  useEffect(() => {
    let labels = [], values = []
    chartsData.forEach(dt => {
      dt.collective_bus_occupancy_details_monthly.forEach(d => {
        labels.push(d.bus_name)
        values.push(d.total_occupancy_monthly)
      })
    })

    setMonthlyData({ labels, values })
    /*  try {
       setInterval(async () => {
         console.log('call')
         let labels = [], data = []
         chartsData.forEach(dt => {
           dt.collective_bus_occupancy_details_monthly.forEach(d => {
             labels.push(d.bus_name)
             data.push(d.total_occupancy_monthly)
           })
         })

         setPerData({ labels: labels, data: data })
       }, 10000);
     } catch (err) {
       console.log(err)
     } */
  }, [])
  useEffect(() => {
    let labels = [], values = []
    chartsData.forEach(dt => {
      dt.collective_bus_occupancy_details_weekly.forEach(d => {
        labels.push(d.bus_name)
        values.push(d.total_occupancy_weekly)
      })
    })

    setWeeklyData({ labels, values })
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <h3>{customData.data}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Monthly and Weekly Buses Data</h5>
                    <CardTitle tag="h2">Graph</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Monthly Data
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block active d-md-block d-lg-block d-xl-block">
                          Weekly Data
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      {/*  <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button> */}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {bigChartData === 'data1' && <PerChart data={monthlyData} title="monthly" />}
                  {bigChartData === 'data2' && <PerChart data={weeklyData} title="weekly" />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
         */}
        <Row>
          {/* <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Current Bus Occupancy Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Timestamp</th>
                      <th>Bus name</th>
                      <th>Current_occupancy</th>
                      <th>Total_occupancy_till_now</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      chartsData.map(dt => {
                        return dt.current_bus_occupancy_details.map(d => {
                          return <tr>
                            <td>{d.timestamp}</td>
                            <td>{d.bus_name}</td>
                            <td>{d.current_occupancy}</td>
                            <td>{d.total_occupancy_till_now}</td>
                          </tr>
                        })
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>

          </Col>
           */}
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Daily Bus Occupancy Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Timestamp</th>
                      <th>Bus_name</th>
                      <th>Total_occupancy_details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      chartsData.map(dt => {
                        return dt.daily_bus_occupancy_details.map(d => {
                          return <tr>
                            <td>{d.timestamp}</td>
                            <td>{d.bus_name}</td>
                            <td>{d.total_occupancy_today}</td>
                          </tr>
                        })
                      })
                    }

                  </tbody>
                </Table>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
