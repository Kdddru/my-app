'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";




export default function Update() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const router = useRouter();
  const params = useParams();
  const id = params.id

  const getData = async function(){
    const promise = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`);
    const res = await promise.json();

    setTitle(res.title);
    setBody(res.body)
  }

  useEffect(()=>{
    getData()
  },[])


  const postData = function(e:any){
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    
    const option = {
      method : 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({title,body})
    }


    fetch(`${process.env.NEXT_PUBLIC_API_URL}${id}`,option)
    .then((res)=>res.json())
    .then((result)=>{
      const lastid = result.id;
      router.push(`/read/${lastid}`);
      router.refresh();
    })    
  }

  return (
    <form onSubmit={postData}>
      <p><input type="text" name="title" placeholder="title" value={title ? title : ""}
      onChange={(e)=>setTitle(e.target.value)}
      /></p>
      <p><textarea name="body" id="" cols={70} rows={40} placeholder="body" value={body ? body : ""}
      onChange={(e)=>setBody(e.target.value)}
      /></p>    
      <p><input type="submit" value='Update' /></p>
    </form>
  )
}
