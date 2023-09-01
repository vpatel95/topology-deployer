import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3 col-sm-4">
                <input type="text" name="username" className="form-control"
                    id="username" placeholder="Username" value={loginData.username} onChange={handleInputChange} />
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating col-sm-4">
                <input type="password" name="password" className="form-control"
                    id="password" placeholder="Password" value={loginData.password} onChange={handleInputChange}/>
                <label htmlFor="password">Password</label>
            </div>
            <br/>
            <div className="form-floating">
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm;
