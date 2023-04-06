import React from 'react'

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    const data = await res.json()

    const paths = data.map(product => {
        return {
            params: {id: product.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }

   
}

export const getStaticProps = async (context) => {

    const id = context.params.id 
    const res = await fetch("https://jsonplaceholder.typicode.com/photos/"+ id)
    const data = await res.json()
    return {
        props: { product: data}
    }
}

function Details({ product }) {
  return (      
    <div>
        <h1>{product.title}</h1>
        <p>{product.url}</p>
        <p>{product.thumbnailUrl}</p>
        <p>{product.id}</p>
    </div>
  )
}

export default Details
