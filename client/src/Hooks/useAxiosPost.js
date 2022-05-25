import {useEffect, useState} from "react"
import axios from 'axios'
import swal from 'sweetalert';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// expect array back 

export default function useAxiosPost(apidata) {
  const[datas, setData]=useState('');
  const[isPending,setPending]=useState(false);
  const[error, setError]=useState(null);

  useEffect(()=>{
    //console.log(apidata.url)
    if(apidata!==''){

      axios.post(apidata.url,apidata.data,{cancelToken: source.token})
      .then(function (res) {
        // handle success
        //console.log(res);
        
       // console.log(res.data.express);
        if(res.statusText!=="OK"){
          throw Error("could not fetch data")
        }
      
        setPending(false);
        if(res.data.status==="ok"){
          swal("Good job!",res.data.express.payload, "success");
          setData(res.data.express.payload)
        }
        else{
            swal( res.data.express.payload);
        }

      })
      .catch(function (error) {
        // handle error
        setError(error)
        swal( error);
      })
    }
  


    return ()=>{
      //source.cancel('Operation canceled by the user.');
    }
  },[apidata])


  return {datas,isPending,error}
}
