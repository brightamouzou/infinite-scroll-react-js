import { useCallback, useEffect, useRef, useState } from "react";
import ApiCall from "./Components/ApiCall";

function App() {

  const observer=useRef();

  const [query, setQuery]=useState("");

  const [pageNumber, setPageNumber]=useState(1);

  const {isLoading, books,error, hasMore}=ApiCall(query, pageNumber)


  function handleChange(e){
    setQuery(e.target.value); 
    setPageNumber(1)

  }

  const lastBookRef=useCallback(node=>{
    console.log(node);
    
    if (observer.current) observer.current.disconnect()

    observer.current=new IntersectionObserver(entries=>{
      
        if(entries[0].isIntersecting && hasMore) {
          console.log('visible')
          setPageNumber(p=>p+1);
        }
      
    });

    if (node) observer.current.observe(node);


  } ,[hasMore,isLoading])



  return (
   
    <div className="app">
       
      <div>
        <h3>Search a stuff</h3>
        <input type="text" className="app__queryWord" autoFocus onChange={handleChange}/>
      </div>

      <div className="resultsBox">
        {
          books.map((book,idx)=>{
            console.log(book);
            return books.length==idx+1?<div ref={lastBookRef}>{book}</div>:<div>{book}</div>
        
          })
          
        }

        {isLoading && "Loading..."}
        {error && "Error..."}
          
      </div>
    </div>
  );
}

export default App;
