import React, {useEffect, useState} from "react";

function AlbumList({ user = {}, albums}) {
  const title = document.title;


  if (user.id === undefined) {
     return <p>Please click on a user name to the left</p>;
  } else {
    return (
      <div>
        <h2>{user.name} Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
                {`${album.id} - ${album.title}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }


}

export default AlbumList;
