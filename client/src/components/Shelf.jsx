import { Album } from "./Album"

export function Shelf({data, shelfName}){
    return (
      <>
      
      <div className="shelf">
        <h3>Shelf {shelfName}</h3>

        {data.map((album) =>{
            return (
              <Album key={album.album} name={album.album} artist={album.artist} description={album.description} art={album.art} released={album.released} genre={album.genre}/>
            )
          })}
      </div>
      
      </>
    )
  }