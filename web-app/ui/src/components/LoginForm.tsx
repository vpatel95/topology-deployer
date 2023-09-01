import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export interface LoginProps {
    onSubmit: (data: LoginData) => void;
}

export interface LoginData {
    username: string;
    password: string;
}

const LoginForm = ({onSubmit }: LoginProps) => {
    const [loginData, setLoginData] = useState<LoginData>({username: '', password: ''});

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLoginData({...loginData, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(loginData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="username" label="Username" className="mb-3 col-sm-4">
                <Form.Control name="username" type="text" placeholder="username"
                    value={loginData.username} onChange={handleInputChange}/>
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password" className="mb-3 col-sm-4">
                <Form.Control name="password" type="password" placeholder="password"
                    value={loginData.password} onChange={handleInputChange}/>
            </FloatingLabel>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LoginForm;
