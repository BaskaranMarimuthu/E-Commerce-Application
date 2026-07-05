import React from 'react'

const LoadProduct = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
        <div className="border-4 wi border-blue-600 p-3  border-t-transparent rounded-full animate-spin   ">
        <span className="sr-only" >Loading...</span>
        </div>
    </div>
  )
}

export default LoadProduct