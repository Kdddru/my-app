"use client"

import { useRouter } from "next/navigation";



export default function Create() {
  const router = useRouter();


  const postData = function(e:any){
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    
    const option = {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({title,body})
    }


    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`,option)
    .then((res)=>res.json())
    .then((result)=>{
      const lastid = result.id;
      router.push(`/read/${lastid}`);
      router.refresh();
    })    
  }


  return (
    <form onSubmit={postData}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" id="" cols={70} rows={40} placeholder="body"/></p>    
      <p><input type="submit" value='create' /></p>
    </form>
  )
}
