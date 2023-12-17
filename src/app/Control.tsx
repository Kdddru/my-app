"use client"
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

//글 생성, 삭제, 업데이트 컴포넌트 
export function Control() {
  const router = useRouter();
  const params =useParams();
  const id = params.id;

  const deleteData = function(){
    const options = {method: 'DELETE'} 

    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, options)
    .then((res)=>res.json())
    .then((result)=>{
      router.push('/')
      router.refresh()
    })
  }


  return (
    <ul>
      <li><Link href='create'>Create</Link></li>
      {
        id &&
        <>
        <li><Link href={`/update/${id}`}>Update</Link></li>
        <li><input type='button' value='delete' onClick={deleteData}/></li>
        </>
      }
    </ul>
  );
}
