import React from 'react'
const BasicLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-4 flex justify-center items-center w-full mx-auto min-h-svh bg-[url(/trivia.avif)]">
        <div className='w-full'>
        {children}
    </div>
    </div>
   
  )
}

export default BasicLayout