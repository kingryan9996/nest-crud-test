import React from 'react'
import { useRouter } from 'next/router'

const Free = () => {

    const router = useRouter()
    console.log(router.query.id)


    if (router.query.id == 'Write') {
        return (<>
            Write사이트
        </>)
    }
    return (
        <div>Free</div>
    )
}

export default Free