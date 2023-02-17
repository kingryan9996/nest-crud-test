import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react'
import App from './pages/src/App';

const List = () => {
    const [data, setData] = useState([]);
    const router = useRouter();

    function dataget() {
        axios.get('/api/hello')
            .then(res => {
                // console.log(res.data[0].name, '<= 바뀐 이름')
                setData(res.data);
                // console.log(res.data, '??????????')
            })
    }
    function dataDelete(id) {
        axios.delete('/api/hello', { data: id });
        window.location.reload();
        setData('');
    }

    useEffect(dataget, [])
    const draggingItemIndex = useRef(null)
    const draggingOverItemIndex = useRef(null)

    const [dragId, setDragId] = useState(null)

    const onDragStart = (e) => {
        draggingItemIndex.current = index
        e.target.classList.add('grabbing')
        setDragId(id)

    }
    const onDragging = (e, index) => {
        console.log(e, index)
        draggingItemIndex.current = index;
        const copyListItems = [...data];
        const dragItemContent = copyListItems[draggingItemIndex.current];
        // 얕은 복사로 만든 카피 배열에서 드래깅되는 아이템을 하나 제거해주고
        copyListItems.splice(draggingItemIndex.current, 1);
        // 카피 리스트 배열에서 드레깅되는 아이템이 지나간 아이템의 인덱스에 드레그된 아이템을 추가해준다.
        copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
        // 드래깅된 아이템의 장소를 드래그 오버된 아이템의 인덱스로 바꾸어준다.
        draggingItemIndex.current = draggingOverItemIndex.current;
        // 드래그 오버 아이템의 useRef객체의 current 값을 초기화해준다.
        draggingOverItemIndex.current = null;
        // 리스트를 새롭게 랜더링할 수 있도록 상태를 업데이트해준다.
        setDragId(copyListItems);
    }

    const onDragEnd = (e) => {
        e.target.classList.remove('grabbing')
        setDragId(null)
    }
    const onDragOver = () => {
        e.preventDefault()
    }


    if (!data.length) return (<>loading....<Link href="/src/Write"> 글쓰기 </Link></>);
    return (
        <>
            <article>
                <h2>첫번째 리스트</h2>
                {/* <ul>
                    {
                        data?.map((obj, idx) => (
                            <li onClick={(e) => { onDragging(e, idx) }}
                                onDragStart={(e) => onDragStart(e, idx, id)}
                                onDragEnter={(e) => onDragging(e, idx)}
                                onDragOver={onDragOver}
                                onDragEnd={onDragEnd}
                                key={obj.id}>
                                {obj.name} / {obj.email} / {obj.tel}
                                <button onClick={() => router.push({ pathname: '/src/Update', query: obj })}>수정</button>
                                <button onClick={() => dataDelete(obj.id)}>삭제</button>
                            </li>
                        ))
                    }
                </ul> */}
            </article>
            <Link href="/src/Write"> 글쓰기 </Link>
            <App data={data} setData={setData} dataDelete={dataDelete} />
        </>
    )
}

export default List