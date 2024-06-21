import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"


const PORT = 7070
const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.DB_CONNECTION
})

// POST ****************************************************************************
// app.post('/albums', async (request, response) => {
//     console.log('REQUEST BODY:', request.body)

//     const {album_name, album_artist, album_description, album_artwork, album_released} = request.body

//     const result = await db.query(`INSERT INTO albums (album_title, album_artist, album_description, album_art, album_released) VALUES ($1, $2, $3, $4, $5)`, [album_name, album_artist, album_description, album_artwork, album_released])
//     response.json({recordInserted: result})
// })

app.post('/albums', async (request, response) => {
    
    const {album_name, album_description, album_artwork, album_released} = request.body
    console.log('REQUEST BODY:', request.body)

    const result = await db.query(`INSERT INTO albums (album_title, album_description, album_art, album_released_year) VALUES ($1, $2, $3, $4)`, [album_name, album_description, album_artwork, album_released])
    response.json({recordInserted: result})
})


// GET ****************************************************************************
app.get('/', (request, response) => {
    response.json({message: `Root for Submission`})
})

app. get('/albums', async (request, response) => {
    try{
        const data = await db.query(`
SELECT albums.album_title AS album, artists.artist_name AS artist, albums.album_description AS description, albums.album_art AS art, albums.album_released_year AS released, ARRAY_AGG(genres.genre_name) AS genre
FROM albums
left join album_genres on albums.album_id = album_genres.album_id
left join genres on album_genres.genre_id = genres.genre_id
left join artists on album_artist_id = artists.artist_id
group by album, artist, description, art, released
                                    `)
        
        response.json(data.rows)

    }
     catch (error){
        response.json(error)
     }
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})