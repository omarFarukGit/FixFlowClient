import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div>
       <div className=" w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col gap-5 justify-center items-center">
        <p> {'verifying'}</p>
        <div>
          <LoaderIcon className=" size-6 animate-spin"></LoaderIcon>
        </div>
      </div>
    </div>
    </div>
  )
}
