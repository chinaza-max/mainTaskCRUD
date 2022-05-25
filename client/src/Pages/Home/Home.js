import "./Home.css"
import useAxiosGet from '../../Hooks/useAxiosGet';


export default function Home() {
  const {datas,isPending,error}=useAxiosGet("/api/books")

  let contents = datas.map((data, index) => {
    return (
      <li key={data._id}>
      <a href="/" download>
        <img src={`uploads/${data.bookName}`} alt="/" />
      </a>
      <span>
        {data.bookTitle}
      </span>
    </li>
    );
  });


  return (
    <section className="home">
      <main>
        {error&& <div>{error}</div>}
        {isPending&& <div>LOADING......</div>}
        <ul>
         {contents}
        </ul>
      </main>
    </section>
  )
}
