import React from "react";
import "./Form.css"
import {useState}  from "react"
import useAxiosPost from '../../Hooks/useAxiosPost';




export default function Form(props) {

    const[title,setTitle]=useState(props.title)
    const[file,setFile]=useState()
    const[apidatas, setApidatas]=useState('');
    const {datas,}=useAxiosPost(apidatas)

    const handleChange=(event)=>{
        const {value}=event.target
        setTitle(value)
    }
    const handleChange2=(event)=>{
        if(event.target.files[0]!==undefined){
            setFile(event.target.files[0]);
        }
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);
        formData.append('title',title);
        formData.append('bookName',props.bookName);
        setApidatas({url:props.url,data:formData})
    }
 
/*
    useEffect(()=>{
      //console.log(apidata.url)
     
      console.log(error)
      if(error!=="bad"){
       // swal("Good job!",datas, "success");
      }
      else{
        swal(datas);
      }
  
      return ()=>{
        //source.cancel('Operation canceled by the user.');
      }
    },[datas,apidatas,error])
  */
  return (
    <section className="Form">
      <form onSubmit={(e)=>{onSubmit(e)}}>
        <div>
   
          {props.file==="true"?
                  <input type="file" onChange={handleChange2} name="file" required/>
          :
                  <input type="file" onChange={handleChange2} name="file" />
          }
        </div>

        <div>

        {props.file==="true"?
         <input type="text" name="title" max={20} placeholder="Book Title" required   onChange={handleChange} />
        :
        <input type="text" name="title" max={20} placeholder={props.title} required   onChange={handleChange} />
        }
    
        </div>
          
        <button>{props.button}</button>
      </form>
    </section>
  );
}
