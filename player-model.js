const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'giro2020',
  password: 'w1xTeller',
  port: 5432,
});

const getPlayers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getRiders = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM riders ORDER BY number ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPlayersRiders = (playerID) => {
  const id = parseInt(playerID)
  console.log("trying to get riders for player id: " )
  return new Promise(function(resolve, reject) {
    pool.query(`
      SELECT 
        riders.name, riders.team, riders.number, riders.price,
        playersriders.ridernumber, playersriders.roundjoined,
        playersriders.originalrider
      FROM 
        playersriders
      INNER JOIN 
        riders
      ON
        playersriders.ridernumber=riders.number
      WHERE playerid = ${id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createPlayer = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, password, teamName } = body
    const points = 0
    console.log(" playermodel: " + name + " - " + password + " - " + teamName)
    pool.query('INSERT INTO players (name, password, teamname, points) VALUES ($1, $2, $3, $4) RETURNING *', [name, password, teamName, points], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

const deletePlayer = (inputID) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(inputID)
    console.log("trying to delete: " + id)
    pool.query('DELETE FROM players WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw(error)
      }
      // console.log(results)
      resolve(`Player deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getPlayers,
  getPlayersRiders,
  createPlayer,
  deletePlayer,
  getRiders,
}
