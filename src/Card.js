
import React, { useEffect, useRef, useState } from 'react';
function Card1(){
    let [wholedata, setwholedata] = useState([]);
    let [data, setData] = useState([]);

     let pagesize = 4;
     
    let [page, setPage] = useState(0);
    let start= page * pagesize;
    let end = start + pagesize;


    useEffect(() => {  

        
         fetch('https://api.github.com/users').then(response => {
      
        response.json().then(data => {
            console.log('Data fetched successfully:', data);
            setwholedata(data);
            setData(data.slice(0, pagesize)); 
            setData(data); // Set the entire data array
            // Initialize data with the first page of results
            // console.log('Initial data:', data.slice(0, pagesize));
            
 
        }).catch(error => {
            console.error('Error parsing JSON:', error);
        });
    }).catch(error => {
        console.error('Error fetching data:', error);
    })
    },[]);
    
   

    function nextPage() {
        let num=page+1
        if (num < wholedata.length/ pagesize) {
console.log("next");

            setPage(num);
            let start = num * pagesize
            let end = start + pagesize
            data = wholedata.slice(start, end);
            setData(data);
        }
    }
        
    function prevPage() {
        let num=page-1
        if (num >= 0) {
console.log("prev");
            setPage(num);
            let start = num * pagesize
            let end = start + pagesize
            data = wholedata.slice(start, end);
            setData(data);
        }
    }

    let inputRef = useRef();
    function handleSearch(event) {
        event.preventDefault();// Prevent the form from submitting and refreshing the page
        console.log(inputRef);
        const query = inputRef.current.value.trim();
        data = data.filter(user => user.login.toLowerCase().includes(query.toLowerCase()));
        setData(data);
        inputRef.current.value = ''; // Clear the input field after search
    }


    return (
        <div>

            <h1>GitHub Users</h1>
            <button onClick={prevPage} >Previous</button>
            <button onClick={nextPage} >Next</button>
            <br/><br/>

           <form>
                <input type="text" placeholder="Search for a user..." ref={inputRef} />
                <button onClick={handleSearch} type="submit">Search</button>
           </form>
           <br/>
            
            {
                data.map((user, index) => (
                    <div key={index} className="card">
                        <img src={user.avatar_url} alt={user.login}  style={{height:"200px", width:"300px" }} />
                        <h2>{user.login}</h2>
                        <p>ID: {user.id}</p>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                ))
            }
        </div>
    );
}

export default Card1;