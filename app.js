const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
app.use(express.json())

let db = null
const dbPath = path.join(__dirname, 'Movies.db')
const initDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(' Server running ')
    })
  } catch (e) {
    console.log(`error in ${e.message}`)
  }
}
initDBandServer()
// initlizeing db code overmodule.exports = app
app.get('/movies/', async (req, res) => {
  const getMoviesQuery = `select * from mcu order by id;`
  const getAllMovies = await db.all(getMoviesQuery)
  res.send(getAllMovies)
})

app.get('/movies/:id', async (req, res) => {
  const {id} = req.params
  const getSingleMovieQuery = `select * from mcu where id=${id};`
  const m = await db.get(getSingleMovieQuery)
  res.send(m)
})
