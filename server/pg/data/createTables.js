const { createMCQTable, addCorrectOptionColumn } = require('./createPgMCQs')
const createUserTable = require('./createUserTable')

const createAllTables = () => {
    createMCQTable()
    addCorrectOptionColumn()
    createUserTable()
}

module.exports = createAllTables