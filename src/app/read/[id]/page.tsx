interface TopicsType{
  id: number,
  title : string,
  body:  string
}

export default async function Read(props:any) {
  const id = props.params.id
  let url = `${process.env.NEXT_PUBLIC_API_URL}topic/${id}`

  const res = await fetch(url, {cache:'no-store'});
  const topics:TopicsType = await res.json();
    

  return (
    <div>
      <h2>Read</h2>
      paramters : {props.params.id}
      {
        topics && 
        <div>
          <p>{topics.title}</p>
          <p>{topics.body}</p>
        </div>
      }
    </div>
  )
}
