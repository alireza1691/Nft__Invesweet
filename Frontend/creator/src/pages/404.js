import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {

    const router = useRouter()
    useEffect (() => {
        setTimeout(() => {
            // router.go(-1)
            router.push('/')
        },3000)
    },[])
  return (
    <div className='not-found'>
        <h1>Ooops....</h1>
        <h2>That page can not be found</h2>
        <p>Go back to the <Link href="/">Home</Link> page</p>
    </div>
  )
}
