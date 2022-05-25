import {useEffect, useState} from "react"
import axios from 'axios'
//const CancelToken = axios.CancelToken;
//const source = CancelToken.source();

// expect array back 

export default function useAxiosGet(url) {
  const[datas, setData]=useState([]);
  const[isPending,setPending]=useState(true);
  const[error, setError]=useState(null);
  const [shouldRefetch, setrefetch] = useState({}); 

  useEffect(()=>{
    //axios.get(url,{cancelToken: source.token})
    axios.get(url)
    .then(function (res) {
      
      if(res.statusText!=="OK"){
        throw Error("could not fetch data")
      }
      setPending(false);

      //setrefetch({})
      setData( res.data.express.payload)
      //source.cancel('Operation canceled by the user.')
    })
    .catch(function (error) {
      // handle error
      setError(error)
      //console.log(error);
    })


  },[url,shouldRefetch])


  return {datas,isPending,setData,setrefetch}
}
