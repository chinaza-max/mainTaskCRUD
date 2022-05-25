import "./DashBoard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useAxiosGet from '../../Hooks/useAxiosGet';
import useAxiosPost from '../../Hooks/useAxiosPost';
import {useEffect,useState} from "react"
import Form from "../../Components/Form/Form"
import CloseIcon from '@mui/icons-material/Close';

export default function DashBoard() {
  const {datas,isPending,setData,setrefetch}=useAxiosGet("/api/books");
  const[apidatas, setApidatas]=useState('');
  const[title, setTitle]=useState('');
  const[bookName, setBookName]=useState('');
  const[toggle, setToggle]=useState(false);

  const {datas:data2}=useAxiosPost(apidatas)

  const deleteAll=()=>{
    setApidatas({url:"/api/deleteAll",data:""})
    setData([])
  }
  const deleteOne=(bookName)=>{
    const formData=new FormData();
    formData.append('bookName',bookName);
    setApidatas({url:"/api/deleteOne",data:formData})
  }
  const editOne=(Bname,Btitle)=>{
    setTitle(Btitle)
    setBookName(Bname)
    setToggle(true)
  }



  let contents = datas.map((data, index) => {
    return (
      <ul className="content" key={data._id}>
        <li>
          <img src={`uploads/${data.bookName}`} alt="#" />
        </li>
        <li>
          <span>{data.bookTitle}</span>
        </li>
        <li>
          <span className="icon" onClick={()=>editOne(data.bookName,data.bookTitle)}>
            <EditIcon />
          </span>
        </li>
        <li>
          <span className="icon" onClick={()=>deleteOne(data.bookName)}>
            <DeleteIcon />
          </span>
        </li>
      </ul>
    );
  });








   

  useEffect(()=>{
    setrefetch({})

  },[setrefetch,apidatas])

  return (
    <section className="DashBoard">
      <main>
        <nav>
          <ul>
            <li>
              <span>Books</span>
            </li>
            <li>
              <span>Title</span>
            </li>
            <li>
              <span>Action</span>
            </li>
            <li className="deleteAll">
              <span onClick={deleteAll}>Delete All</span>
            </li>
          </ul>
        
          {contents}
        </nav>
        {isPending&& <div className="loading">LOADING......</div>}

        {toggle&&

        <div className="edit"> 
             <span onClick={()=>{setToggle(false); setrefetch({})}}><CloseIcon/>  </span> 
            <Form  button="update" title={title} bookName={bookName} file="false" url="/api/update" />
        </div>
        }
        
      </main>
     
    </section>
  );
}
//
//
