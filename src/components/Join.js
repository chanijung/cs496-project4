import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
        {!isJoinSuccess && (
            <>
            <h2>Join</h2>
            <form
            onSubmit={handleSubmit}
            >
            <input
                type="text"
                name="semester"
                value={semester}
                onChange={e => setSemester(e.target.value)}
                placeholder="semester"
            />
            <input
                type="text"
                name="classNum"
                value={classNum}
                onChange={e => setClassNum(e.target.value)}
                placeholder="class"
            />
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
            <input
                type="name"
                name="name"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="name"
            />
            <button
                type="submit"
            >
            제출
            </button>
            </form>
            </>
        )}
        {isJoinSuccess && (
            <div>
            <p>회원가입을 축하합니다!</p>
            <Link to="/login">로그인</Link>
            </div>
        )}
        </div>
    );
};
export default Join;

