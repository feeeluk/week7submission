import { useState } from "react"


export function Form(){

    const [form, setForm] = useState({
        album_name : '',
        //album_artist : '',
        album_description : '',
        album_artwork : '',
        album_released : ''
        //album_genre : ''
    })

    function handleSubmit(submit){
        submit.preventDefault()
        fetch('http://localhost:7070/albums', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    function handleChange(event){
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    return(
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
    )
}