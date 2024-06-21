export function Album({name, artist, description, art, released, genre}){
    return (
      <div className="album">
        <h5>Album</h5>
        <p>Album: {name}</p>
        <p>Artist: {artist}</p>
        <p>Description: {description}</p>
        <p>Artwork: <img src={art} /></p>
        <p>Year of release: {released}</p>
        <p>Genre: {genre}</p>
      </div>
    )
  }