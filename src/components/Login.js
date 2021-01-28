import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginOrJoin from '../LoginOrJoin';
const Login = ({ setHasToken, getHasToken }) => {

    const [ userId, setUserId ] = useState('');
    const [ userPw, setUserPw ] = useState('');
    const loginApi = (user) => {
        return fetch('/users/login', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !userPw) {
            return;
        }
        try {
            const response = await loginApi({
                uid: userId,
                pwd: userPw
            });
            if (response.result === 'ok') {
                alert('로그인 성공');
                console.log(getHasToken());
                setHasToken(response.token, userId);
            } else {
                throw new Error(response.error);
            }
        } catch (err) {
            alert('로그인에 실패했습니다.');
            setUserId('');
            setUserPw('');
            console.error('login error', err);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            {/* <Router>
                {!getHasToken() ? <Redirect to="/login" /> : <Redirect to="/" />}
                <Switch>
                    <Route
                        exact path="/"
                        component={LoginOrJoin}
                        // render={routerProps => {
                        //     return (
                        //         <App
                        //             {...routerProps}
                        //             // setHasCookie={setHasCookie}
                        //             // removeCookie={() => {
                        //             //     removeCookie('user');
                        //             //     setHasCookie(false);
                        //             // }}
                        //         />
                        //     );
                        // }}
                    />
                </Switch>
            </Router> */}

            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="uid"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="id"
                />
                <input
                    type="password"
                    name="pwd"
                    value={userPw}
                    onChange={e => setUserPw(e.target.value)}
                    placeholder="pw"
                />
                <button
                    type="submit"
                >
                    Login
                </button>
            </form>
            <Link
                to="/join"
            >
                회원가입
            </Link>
        </div>
    );
};
export default Login;
