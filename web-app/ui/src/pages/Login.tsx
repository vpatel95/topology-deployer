import { Component } from "react";
import { Navigate } from "react-router-dom";
import type { LoginData } from './../components/LoginForm';
import LoginForm from './../components/LoginForm';
import AuthService from './../services/auth';

type Props = {};
type State = {
    redirect: string | null,
    username: string,
    password: string,
    loading: boolean,
    message: string
};

export default class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            redirect: null,
            username: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    handleLogin(loginData: LoginData) {
        const {username, password} = loginData;

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(username, password).then(
            () => {
                this.setState({
                    redirect: "/user",
                });
            },
            error => {
                const errMsg =
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                     error.message ||
                     error.toString();

                this.setState({
                    loading: false,
                    message: errMsg
                });
            }
        );
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        return (
            <div className="login">
                <h2>Login</h2>
                <LoginForm onSubmit={this.handleLogin}/>
            </div>
        )
    }
}
