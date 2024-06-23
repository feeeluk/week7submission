import { Album } from "./Album"

export function Shelf({data, shelfName}){
    return (
      <>
      
        <div className="shelfTitle">

            <h4>{shelfName}</h4>

        </div>

        <div className="shelf">
          

          {data.map((album) =>{
              return (
                <Album key={album.album} name={album.album} artist={album.artist} description={album.description} art={album.art} released={album.released} genre={album.genre}/>
              )
            })}
        </div>
      
      </>
    )
  }