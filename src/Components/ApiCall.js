import React, { useEffect, useState } from 'react';
import axios from "axios";

//Here the api we are calling will give us informations about books we are querying. We are going to collect the bools title only

const ApiCall = (query, pageNumber) => {
        const [isLoading,setIsLoading]=useState(false);
        const [error,setError]=useState(false);
        const [books,setBooks]=useState([]);
        const [hasMore,setHasMore]=useState(false);

    useEffect(()=>{
        setBooks([])
    },[query])
   
    useEffect(()=>{
        if(query.length>0){

            let cancel;
            setIsLoading(true)
    
            axios({
                method:"GET",
                url:"https://openlibrary.org/search.json?q=the+lord+of+the+rings",
                params:{q:query, page:pageNumber},
                cancelToken:new axios.CancelToken(c=>cancel=c)
    
            }).then(res=>{
                setIsLoading(false)
                console.log(res.data.docs);
                setBooks(prevBooks=>[...new Set([...prevBooks,...res.data.docs.map(book=>book.title)])])
                setHasMore(res.data.docs.length>0)
    
            }).catch(err=>{
                if(axios.isCancel()){
                    setError(true)
                    return
                }
            })
    
            return ()=>cancel()
        }
            
        }, [query, pageNumber])
    
        return {hasMore, error, isLoading, books}

};

export default ApiCall;