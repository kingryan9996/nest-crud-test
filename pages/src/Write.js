import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Write = () => {
    const router = useRouter();
    const initial = { id: '', name: '', email: '', tel: '' }
    const [inputValue, setValue] = useState(initial);
    function valueChange(e) {
        let t = e.target;
        setValue((obj) => {
            return { ...obj, [t.name]: t.value }
        })
    }

    function create(e) {
        e.preventDefault();
        // get, post, put, delete
        //get는 요청할때
        //post는 신규데이터생성할때
        //put은 수정할때
        //delete는 삭제할때

        axios.post('/api/hello', { ...inputValue, id: Date.now().toString() })
        // 삭제할때 필터검열 안된 이유 :  .toString()을 안했더니 id값이 Number타입으로 저장되서
        router.push('/');
    }
    return (
        <div>
            <form onSubmit={create}>
                <p><input onChange={valueChange} type="text" placeholder='이름' name="name" /></p>
                <p><input onChange={valueChange} type="email" placeholder='메일' name="email" /></p>
                <p><input onChange={valueChange} type="tel" placeholder='연락처' name="tel" /></p>
                <p><input type="submit" value="저장" /></p>
            </form>
        </div>
    )
}

export default Write