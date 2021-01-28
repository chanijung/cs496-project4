import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginOrJoin from '../LoginOrJoin';
import '../LoginOrJoin.css';

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
                setHasToken(response.token);
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
        <div className="loj2">
            <h2 className="login">로그인</h2>

            <form
                onSubmit={handleSubmit}
            >
                <div className="idpwd">
                    아이디
                    <input className="idpwd_input"
                        type="text"
                        name="uid"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="id"
                    />
                </div>
                <br/>
                <div className="idpwd">
                    비밀번호
                    <input className="idpwd_input"
                        type="password"
                        name="pwd"
                        value={userPw}
                        onChange={e => setUserPw(e.target.value)}
                        placeholder="pw"
                    />
                </div>
                <br/>
                <button type="submit">
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
