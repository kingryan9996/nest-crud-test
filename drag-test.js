import React, { useState, useEffect } from 'react'
import Contaier from './Container'
import List from './List'
import ListItem from './ListItem'

const _SocialNetworks = [
    { title: "Twitter", color: "white", backgroundColor: "Red" },
    { title: "Facebook", color: "black", backgroundColor: "Orange" },
    { title: "Line", color: "black", backgroundColor: "Yellow" },
    { title: "Instagram", color: "white", backgroundColor: "Green" },
    { title: "Telegram", color: "white", backgroundColor: "Blue" },
    { title: "KaKao", color: "white", backgroundColor: "DarkBlue" },
    { title: "LinkedIn", color: "white", backgroundColor: "Purple" },
]

const _initGrabData = {
    target: null,
    position: null,
    move_up: [],
    move_down: [],
    updateList: []
}


const App = ({ data, dataDelete }) => {
    const [lists, setLists] = useState(_SocialNetworks);
    const [grab, setGrab] = useState(_initGrabData);
    const [isDrag, setIsDrag] = useState(false);
    console.log(lists, '22???????????22')
    console.log(grab.updateList, '333????22')

    useEffect(() => { }, [grab]);

    const _onDragOver = e => { e.preventDefault(); }

    const _onDragStart = e => {
        setIsDrag(true);
        setGrab({
            ...grab,
            target: e.target,
            position: Number(e.target.dataset.position),
            updateList: [...data]
        });

        e.target.classList.add("grabbing");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
    }

    const _onDragEnd = e => {
        setIsDrag(false);
        e.target.classList.remove("grabbing");
        e.dataTransfer.dropEffect = "move";

        setLists([...grab.updateList]);

        setGrab({
            target: null,
            move_up: [],
            move_down: [],
            updateList: []
        });

        e.target.style.visibility = "visible";
    }

    const _onDragEnter = e => {
        let grabPosition = Number(grab.target.dataset.position);
        let listPosition = grab.position;
        let targetPosition = Number(e.target.dataset.position);

        let move_up = [...grab.move_up];
        let move_down = [...grab.move_down];

        let data = [...grab.updateList];
        data[grabPosition] = data.splice(targetPosition, 1, data[grabPosition])[0];

        if (listPosition > targetPosition) {
            move_down.includes(targetPosition) ? move_down.pop() : move_down.push(targetPosition);
        } else if (listPosition < targetPosition) {
            move_up.includes(targetPosition) ? move_up.pop() : move_up.push(targetPosition);
        } else {
            move_down = [];
            move_up = [];
        }

        setGrab({
            ...grab,
            move_up,
            move_down,
            updateList: data,
            position: targetPosition
        })
    }
    const _onDragLeave = e => {
        if (e.target === grab.target) {
            e.target.style.visibility = "hidden";
        }
    }

    //드래그 상태에 관한 함수 5개
    // Over / Start / End / Enter / Leave
    // Over는 이벤트의 종료만 설정 < ul >에설정
    // Leave는 적용해둔 스타일을 해제하는 것만

    return (
        <div>
            <ul
                onDragOver={
                    _onDragOver
                }
            >
                {
                    lists?.map((sns, index) => {
                        let classNames = ""

                        grab.move_up.includes(index) && (classNames = "move_up")
                        grab.move_down.includes(index) && (classNames = "move_down")

                        return (
                            <li
                                key={index}
                                data-position={index}
                                className={classNames}
                                isDrag={isDrag}

                                onDragStart={_onDragStart}
                                onDragEnd={_onDragEnd}
                                onDragEnter={_onDragEnter}
                                onDragLeave={_onDragLeave}

                                draggable
                                style={{
                                    backgroundColor: sns.backgroundColor,
                                    color: sns.color,
                                    fontSize: "bold"
                                }}
                            >
                                {
                                    // sns.title
                                    sns.name
                                } / {sns.email} / {sns.tel}
                                <button onClick={() => router.push({ pathname: '/src/Update', query: obj })}>수정</button>
                                <button onClick={() => dataDelete(sns.id)}>삭제</button>
                            </li>
                        )
                    })
                }
            </ul>
            <ul
                onDragOver={
                    _onDragOver
                }
            >
                {
                    data?.map((sns, index) => {
                        let classNames = ""

                        grab.move_up.includes(index) && (classNames = "move_up")
                        grab.move_down.includes(index) && (classNames = "move_down")

                        return (
                            <li
                                key={index}
                                data-position={index}
                                className={classNames}
                                isDrag={isDrag}

                                onDragStart={_onDragStart}
                                onDragEnd={_onDragEnd}
                                onDragEnter={_onDragEnter}
                                onDragLeave={_onDragLeave}

                                draggable
                                style={{
                                    backgroundColor: sns.backgroundColor,
                                    color: sns.color,
                                    fontSize: "bold"
                                }}
                            >
                                {
                                    // sns.title
                                    sns.name
                                } / {sns.email} / {sns.tel}
                                <button onClick={() => router.push({ pathname: '/src/Update', query: obj })}>수정</button>
                                <button onClick={() => dataDelete(sns.id)}>삭제</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div> MoveUp: {grab.move_up} </div>
            <div> MoveDown: {grab.move_down} </div>
        </div>
    )
}

export default App