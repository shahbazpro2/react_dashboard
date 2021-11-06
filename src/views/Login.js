
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useHistory } from "react-router-dom";

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            alert("Please Fill In Details")
            return
        }
        if (username === 'user' && password === 'user') {
            sessionStorage.setItem('login', true)
            history.push('/admin/dashboard')
        } else {
            alert('Invalid Credentials')
        }
    }

    return (
        <Container>
            <div style={{ marginTop: '20vh' }}>
                <h3>Login</h3>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        </Container>
    )
}

