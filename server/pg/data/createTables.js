const createMCQTable = require('./createPgMCQs')
const createUserTable = require('./createUserTable')

const createAllTables = () => {
    createMCQTable()
    createUserTable()
}

module.exports = createAllTables