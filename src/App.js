import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]); 
  const title = document.title;
  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3
  useEffect(() =>{
    document.title = "Awesome Album App";
     const abortController = new AbortController(); 
    async function loadUsers(){
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',{signal: abortController.signal});
        const userList = await response.json();
        setUsers(userList);
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
          } else {
            throw error;
          }
        }
       }
   
    loadUsers();
    return ()=> abortController.abort();
  },[]);
  
   useEffect(() => { 
      const abortController = new AbortController();
          async function loadAlbums(){
            try {
              if(currentUser.id){
              const response = await fetch( `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
                { signal: abortController.signal }
              );
              const albumList = await response.json();
              setAlbums(albumList); 
              }
              } catch (error) {
                if (error.name === "AbortError") {
                  // Ignore `AbortError`
                  console.log("Aborted");
                } else {
                  throw error;
                } 
              }
             } 
      loadAlbums();
      return () => { 
        document.title = title;
        abortController.abort();};

  },[currentUser.id]);
  
  
  
  
  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} />
      </div>
    </div>
  );
}

export default App;
