import { useState, useEffect } from 'react'
import { Shelf } from "./components/Shelf"

export function App(){

  let [album, setAlbum] = useState([])
  let [genre, setGenre] = useState([])
  const [form, setForm] = useState({
    album_name : '',
    //album_artist : '',
    album_description : '',
    album_artwork : '',
    album_released : ''
    //album_genre : ''
  })
  const [submitted, setSubmitted] = useState(0)

  // *******************************************************************************************
  useEffect( () => {

    fetchData()

    async function fetchData(){
      const response = await fetch("https://week7submissionserver.onrender.com/albums")
      const albumData = await response.json(response.rows)
      setAlbum(albumData)
    }

  }, [submitted])

  function handleSubmit(submit){
    
    submit.preventDefault()
    fetch('http://localhost:7070/albums', {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json"
        }
    })

    setTimeout(()=>{
      setSubmitted(submitted + 1)
    }, 100)
}

function handleChange(event){
    setForm({
        ...form,
        [event.target.name] : event.target.value
    })
}

  return(
    <>
      <div className="bookcase">

        <h2>Music Bookcase</h2>

        <Shelf data={album} shelfName="(all albums)"/>
        <Shelf data={genre} shelfName="(by genre - coming soon!)" />

          <h2>Enter a new album</h2>

          <form onSubmit={handleSubmit}>

<p>
<label htmlFor="album_name">Album: </label>
<input id="album_name" name="album_name" type="text" placeholder="album name" onChange={handleChange} />
</p>

{/* <p>
<label htmlFor="album_artist">Artist: </label>
<input id="album_artist" name="album_artist" type="text" placeholder="name of artist or band" onChange={handleChange} />
</p> */}

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
