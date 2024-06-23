import { useState, useEffect } from 'react'
import { Shelf } from "./components/Shelf"
import { ArtistShelf } from "./components/ArtistShelf"

export function App(){

  let [albums, setAlbums] = useState([])
  let [artists, setArtists] = useState([])
  let [genre, setGenre] = useState([])
  const [form, setForm] = useState({
    album_name : '',
    album_artist : '',
    album_description : '',
    album_artwork : '',
    album_released : ''
    //album_genre : ''
  })
  const [submitted, setSubmitted] = useState(0)

  // *******************************************************************************************
  useEffect( () => {

    fetchAlbums()
    fetchArtists()

    async function fetchAlbums(){
      const response = await fetch("https://week7submissionserver.onrender.com//albums")
      const albumData = await response.json(response.rows)
      setAlbums(albumData)
    }


    async function fetchArtists(){
      const response = await fetch("https://week7submissionserver.onrender.com//artists")
      const artistsData = await response.json(response.rows)
      setArtists(artistsData)
    }

  }, [submitted])

  function handleSubmit(submit){
    
    submit.preventDefault()
    fetch('https://week7submissionserver.onrender.com//albums', {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json"
        }
    })

    setTimeout(()=>{
      setSubmitted(submitted + 1)
    }, 400)
}

function handleChange(event){
    setForm({
        ...form,
        [event.target.name] : event.target.value
    })
}

function handleChangeInteger(event){
  setForm({
      ...form,
      [event.target.name] : parseInt(event.target.value, 10)
  })
}

  return(
    <>

      <h2>Music Bookcase</h2>

      <div className="bookcase">

        <Shelf data={albums} shelfName="All albums"/>

        <ArtistShelf data={artists} shelfName="Albums by Artist - (not working yet)"/>

      </div>

      <div>

        <h2>Enter a new album</h2>

        <form onSubmit={handleSubmit}>

          <p>
            <label htmlFor="album_name">Album: </label>
            <input id="album_name" name="album_name" type="text" placeholder="album name" onChange={handleChange} />
            </p>

          <p>
            <label htmlFor="album_artist">Artist: </label>
            <select id="album_artist" name="album_artist"  value="4" onChange={handleChangeInteger} >
              {artists.map((artist) =>{
                        return (
                          <option key={artist.artist_id} value={artist.artist_id}>{artist.artist_name}</option>
                        )
                      })}
            </select>
          </p>

          <p>
            <label htmlFor="album_description">Description: </label>
            <input id="album_description" name="album_description" type="text" placeholder="a short description" onChange={handleChange} />
          </p>

          <p>
            <label htmlFor="album_artwork">Artwork: </label>
            <input id="album_artwork" name="album_artwork" type="text" placeholder="a URL of the album cover" onChange={handleChange} />
          </p>

          <p>
            <label htmlFor="album_released">Released: </label>
            <input id="album_released" name="album_released" type="text" placeholder="the year of release" onChange={handleChange} />
          </p>

          {/* <p>
          <label htmlFor="album_genre">Genre: </label>
          <input id="album_genre" name="album_genre" type="text" placeholder="a single genre" onChange={handleChange} />
          </p> */}

          <button type="submit">Submit</button>         

        </form>
        
      </div>   
    </>
  )
}
