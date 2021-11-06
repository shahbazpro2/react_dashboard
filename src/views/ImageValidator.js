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
import React, {useEffect, useState} from "react"
import {Row, Col, Button} from "reactstrap";
import {Image} from "antd";
import {useHistory} from "react-router-dom";

function ImageValidator() {
    const [currentImage, setCurrentImage] = useState('')
    const [noImage, setNoImage] = useState(true)
    const history = useHistory()

    const getImage = () => {
        fetch("http://192.168.1.100:8080/retrieve-image", {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                if (result.message === 'No Image') {
                    setNoImage(true)
                } else {
                    setCurrentImage(result.base64_image)
                    setNoImage(false)
                }

            })
            .catch((error) => {
                setNoImage(true)
            })
    }

    const onSubmitResult = (result) => {
        fetch("http://192.168.1.100:8080/valid-image", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "image_uuid": "d56c0876-5a1f-4f1c-b9c7-9b9dd2232607",
                "result": !!result
            })
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                getImage()
            })
            .catch((error) => {
                alert(error)
                setNoImage(true)
            })
    }

    useEffect(() => {
        getImage()
    }, [])

    useEffect(() => {
        if (!!sessionStorage.getItem('login') !== true) {
            history.push('/login')
        }
    }, [])

    return (
        <>
            <div className="content">
                <Row>
                    <Col sm="12" md={4}>
                    </Col>
                    <Col sm="12" md={4}>
                        {
                            noImage ? (
                                <center>
                                    <h3>No Image</h3>
                                </center>
                            ) : (
                                <div style={{ width: "100%" }}>
                                    <img src={currentImage} />
                                </div>
                            )
                        }
                    </Col>
                    <Col sm="12" md={4}>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 12, offset: 5 }}>
                        <Button onClick={() => onSubmitResult(true)}>Accept</Button>
                        <Button onClick={() => onSubmitResult(false)}>Reject</Button>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ImageValidator;
