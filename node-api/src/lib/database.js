var sqlite = require('sqlite-async')

const DBSOURCE = 'db.sqlite'

class PoolClient {
  constructor() {
    this.database = null
  }

  async connect() {
    try {
      this.database = await sqlite.open(DBSOURCE)
      await this.createDefaultTables()
      console.log('Connected to the SQLite database!')
    } catch (error) {
      throw Error('Cannot access sqlite database')
    }
  }

  async createDefaultTables() {
    await this.database.run(
      `CREATE TABLE IF NOT EXISTS charge (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address TEXT UNIQUE, 
            expires TIMESTAMP, 
            status TEXT, 
            original_amount FLOAT,
            final_amount FLOAT,
            CONSTRAINT address_unique UNIQUE (address)
            )`
    )
  }

  get db() {
    if (this.database) {
      return this.database
    }
    throw new Error(
      '[poolClient Error] should connect before getting the db object'
    )
  }
}

module.exports = new PoolClient()
