import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navigation from './nav'
const Join = () => {
    const [ semester, setSemester ] = useState('');
    const [ classNum, setClassNum ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ userPw, setUserPw ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ isJoinSuccess, setJoinSuccess ] = useState(false);
    const createUserApi = (user) => {
        return fetch('/users/join', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(response => response.json());
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserApi({
                semester: semester,
                classNum: classNum,
                uid: userId,
                pwd: userPw,
                name: userName
            });
            if (response.result === 'ok') {
                setJoinSuccess(true);
            }
        } catch (err) {
            console.error('login error', err);
            alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.')
        }
    };
    return (
        <div>
        <Navigation></Navigation>
        <div>
        {!isJoinSuccess && (
            <div className="loj3">
                <h2 className="login">회원가입</h2>
                <form className="login-form"
                    onSubmit={handleSubmit}
                >
                    <input className="idpwd_input"
                        type="text"
                        name="semester"
                        value={semester}
                        onChange={e => setSemester(e.target.value)}
                        placeholder="학기(ex.2019s,2020w)"
                    />
                    <input className="idpwd_input"
                        type="text"
                        name="classNum"
                        value={classNum}
                        onChange={e => setClassNum(e.target.value)}
                        placeholder="분반"
                    />
                    <input className="idpwd_input"
                        type="text"
                        name="uid"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="아이디"
                    />
                    <input className="idpwd_input"
                        type="password"
                        name="pwd"
                        value={userPw}
                        onChange={e => setUserPw(e.target.value)}
                        placeholder="비밀번호"
                    />
                    <input className="idpwd_input"
                        type="name"
                        name="name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder="이름"
                    />
                    <button className="login_button"
                        type="submit"
                    >
                    제출
                    </button>
                </form>
            </div>
        )}
        {isJoinSuccess && (
            <div className="after-join">
            <p>회원가입을 축하합니다!</p>
            <div className="login-after-join">
                <Link to="/login">로그인</Link>
            </div>
            </div>
        )}
        </div>
        </div>
    );
};
export default Join;

