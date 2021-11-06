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
import { io } from 'socket.io-client'
import output from '../output.json'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
function Icons() {
  const [data, setData] = useState({})
  const [plate, setPlate] = useState([])
  const history = useHistory()
  useEffect(() => {
    //https://transit-ai.ngrok.io
    const socket = io("http://127.0.0.1:8000");
    socket.on("my event", d => {
      setData(d)
      console.log('d', d)
    })
    socket.on("plate event", d => {
      console.log('plat', d)
      setPlate(d)
    })
    socket.on('disconnect', () => {
      // console.log('disco')
      //socket.disconnect()
    });
    // console.log(output[0])
    setData(output[0])
  }, [])

  useEffect(() => {
    if (!!sessionStorage.getItem('login') !== true) {
      history.push('/login')
    }
  }, [])

  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }
  const getValue = (val) => {
    if (typeof val === 'string') {
      return val.replaceAll('_', " ")
    } else if (isFloat(val)) {
      return val.toFixed(3);
    } else {
      return val
    }
  }
  const getData = () => {
    const hdata = data.health_data
    // console.log('arr', hdata)
    let arr = []
    for (var key in hdata) {
      if (hdata.hasOwnProperty(key)) {
        arr.push(<Col
          className="font-icon-list col-xs-6 col-xs-6 justify-content-center"
          lg="3"
          md="4"
          sm="4"
        >
          <div className="font-icon-detail d-flex">
            <div>
              {
                key === 'time' || key === 'uptime' || key === 'nvp_model' ?
                  <h1 style={{ fontSize: '18px' }}>{getValue(hdata[key])}<span style={{ fontSize: '15px', position: 'absolute' }}></span></h1> :
                  key === 'RAM' || hdata[key] === 'OFF' ? <h1 style={{ fontSize: '40px' }}>{getValue(hdata[key])}</h1> :
                    <h1 style={{ fontSize: '40px' }}>{getValue(hdata[key])}<span style={{ fontSize: '15px', position: 'absolute' }}></span></h1>
              }
              <h6>{key.replace('_', " ")}</h6>
              {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
            </div>
          </div>
        </Col>)
      }
    }

    return arr
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title">AI Processed Data - AI Pilot Buses</h4>

              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  {
                    data?.current_bus_occupancy_details?.length > 0 &&
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6 justify-content-center"
                      lg="3"
                      md="4"
                      sm="4"
                    >
                      <div className="font-icon-detail d-flex">
                        <div>
                          <h1 style={{ fontSize: '40px' }}>{data.current_bus_occupancy_details[0].current_occupancy}</h1>
                          <h6>Current Person Occupancy</h6>
                          <h6 className="title">AI Pilot Bus</h6>

                          {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
                        </div>
                      </div>
                    </Col>
                  }
                  {
                    data?.current_bus_occupancy_details?.length > 0 &&
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6 justify-content-center"
                      lg="3"
                      md="4"
                      sm="4"
                    >
                      <div className="font-icon-detail d-flex">
                        <div>
                          <h1 style={{ fontSize: '40px' }}>{data.current_bus_occupancy_details[0].current_occupancy_1}</h1>
                          <h6>Current Bags Occupancy</h6>
                          <h6 className="title">AI Pilot Bus</h6>

                          {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
                        </div>
                      </div>
                    </Col>
                  }
                  {
                    data?.current_bus_occupancy_details?.length > 0 &&
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6 justify-content-center"
                      lg="3"
                      md="4"
                      sm="4"
                    >
                      <div className="font-icon-detail d-flex">
                        <div>
                          <h1 style={{ fontSize: '40px' }}>{data.current_bus_occupancy_details[0].current_occupancy_2}</h1>
                          <h6>Current Faces Occupancy</h6>
                          <h6 className="title">AI Pilot Bus</h6>

                          {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
                        </div>
                      </div>
                    </Col>
                  }

                  {
                    data?.current_bus_occupancy_details?.length > 0 &&
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6 justify-content-center"
                      lg="3"
                      md="4"
                      sm="4"
                    >
                      <div className="font-icon-detail d-flex">
                        <div>
                          <h1 style={{ fontSize: '40px' }}>{data.current_bus_occupancy_details[0].current_occupancy_3}</h1>
                          <h6>Current Faces Without Mask</h6>
                          <h6 className="title">AI Pilot Bus</h6>

                          {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
                        </div>
                      </div>
                    </Col>
                  }

                </Row>

              </CardBody>
              <CardHeader>
                <h4 className="title">AI Processed Data - License Plate Recognition</h4>


              </CardHeader>
              <CardBody className="all-icons">
                <Row>

                  <Col
                    className="font-icon-list col-xs-12 col-xs-12 justify-content-center"
                    lg="8"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <Row>
                          {plate.map(p => (
                            <Col
                              className="font-icon-list col-6 justify-content-center"
                              lg="4"
                              md="4"
                              sm="4"
                            >
                              <h3 style={{ fontSize: '16px' }}>{p}</h3>
                            </Col>
                          ))}
                        </Row>

                        {/* <h6>License Plate Recognition</h6>
                          <h6 className="title">AI Pilot Vehicles</h6> */}

                        {/* <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6> */}
                      </div>
                    </div>
                  </Col>

                </Row>
              </CardBody>
              <CardHeader>

                <h4 className="title">Jetson Health Data</h4>

              </CardHeader>
              <CardBody className="all-icons" style={{ minHeight: '79vh' }}>
                <Row>
                  {getData().map(m => m)}
                  {/*   <Col
                    className="font-icon-list col-md-3 col-lg-3 col-xs-6 col-xs-6 justify-content-center"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <h1>{chartsData[0].health_data.cpu_temparature}<span style={{ fontSize: '15px', position: 'absolute' }}>&#8451;</span></h1>
                        <h6>Cpu Temperatue</h6>
                        <h6 className="text-danger mb-0">{chartsData[0].health_data.critical_temparature} is Critical Temparature</h6>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-md-3 col-lg-3 col-xs-6 col-xs-6 justify-content-center"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <h1>{chartsData[0].health_data.gpu_temparature}<span style={{ fontSize: '15px', position: 'absolute' }}>&#8451;</span></h1>
                        <h6>Gpu Temparature</h6>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-md-3 col-lg-3 col-xs-6 col-xs-6 justify-content-center"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <h1>{chartsData[0].health_data.thermal_temperature}<span style={{ fontSize: '15px', position: 'absolute' }}>&#8451;</span></h1>
                        <h6>Thermal Temperature</h6>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-md-3 col-lg-3 col-xs-6 col-xs-6 justify-content-center"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <h1>{chartsData[0].health_data.gpu_state.toUpperCase()}</h1>
                        <h6>Gpu State</h6>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-md-3 col-lg-3 col-xs-6 col-xs-6 justify-content-center"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail d-flex">
                      <div>
                        <h1>{chartsData[0].health_data.memory_usage}/{chartsData[0].health_data.total_memory}</h1>
                        <h6>Memory Usage</h6>
                      </div>
                    </div>
                  </Col>
 */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons;
