// 클라이언트 컴포넌트 (React)
// "use client"
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Control } from './Control'

interface dataType{
  title: string,
  body: string,
  id: number,
}

//서버 컴포넌트
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, { next: {revalidate : 0}});  //캐시를 쓰지않는다 or {cache : 'no-store'} 
  const topics = await res.json();


  return (
    <html>
      <body>
        <h2><Link href='/'>WEB</Link></h2>
        <ol>
          {
            topics && topics.map((t:dataType)=>
            <li key={t.id}><Link href={`/read/${t.id}`}>{t.title}</Link></li>
            )
          }
        </ol>
        <br/>
        <hr/>
        여기에 Route가 나옵니다 {children}
        <hr/>
        <br/>
        <Control/>
      </body>
    </html>
  )
}
