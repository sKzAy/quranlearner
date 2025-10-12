"use client"
import React from 'react'
import { onDeleteClick } from '../lib/api'
import { toast } from 'sonner'
import { RemoveCircle } from '@mui/icons-material'
import { Trio } from 'ldrs/react'
import { useState } from 'react'

const DeleteProp = ({props}) => {
  const [deleted, setDeleted] = useState(false)
  return (
    
    <>
       <button onClick={ async ()=>{
        setDeleted(true)
        let answer = await onDeleteClick(props.surah,props.verse)
        if (answer === 1){ 
        toast.success("Successfully deleted!", {
            unstyled: true,
            className:
              "bg-red-400 text-white border border-red-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
          });
          setTimeout(() => {
            setDeleted(false)
          }, 1500);
        }
        else if(answer ===-1){
           toast.success("Successfully deleted!", {
            unstyled: true,
            className:
              "bg-red-400 text-white border border-red-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
          });
        }
          
       }
        
       }  className='rounded-full p-2 text-red-500 cursor-pointer'>{
        deleted ? <Trio
                size="20"
                speed="1.5"
                color='red'
              /> :
        <RemoveCircle/>
        }</button>
    </>
  )
}

export default DeleteProp
