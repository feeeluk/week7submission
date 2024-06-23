import { Album } from "./Album"

export function ArtistShelf({data, shelfName}){

    function handleChange(event){
      let value = document.getElementById("artist").value
      console.log("WHERE artist_id = " + value)
    } 

    return (
      <>
      
        <div className="shelfTitle">

            <h4>{shelfName}</h4>

        </div>   

        <div className="shelf">
          
          <select id="artist" name="artist"  value="4" onChange={handleChange}>
                {data.map((artist) =>{
                          return (
                            <option key={artist.artist_id} value={artist.artist_id} >{artist.artist_name}</option>
                          )
                        })}
            </select>
        </div>
      
      </>
    )
  }