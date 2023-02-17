import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const Update = () => {

    const router = useRouter();
    const { query } = router

    const initial = { id: query.id, name: query.name, email: query.email, tel: query.tel }

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
        axios.put('/api/hello', { ...inputValue, id: query.id })
        router.push('/');
    }




    console.log(query, '쿼리')
    console.log(inputValue)
    return (
        <div>
            <form onSubmit={create}>
                <p><input value={inputValue.name} onChange={valueChange} type="text" placeholder='이름' name="name" /></p>
                <p><input value={inputValue.email} onChange={valueChange} type="email" placeholder='메일' name="email" /></p>
                <p><input value={inputValue.tel} onChange={valueChange} type="tel" placeholder='연락처' name="tel" /></p>
                <p><input type="submit" value="저장" /></p>
            </form>
        </div>
    )
}

export default Update