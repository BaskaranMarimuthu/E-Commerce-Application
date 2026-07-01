import { useEffect } from 'react'

const Title = ({title}) => {

    useEffect(()=>{
 document.title = title;
    },[]);

  return null;
}

export default Title;