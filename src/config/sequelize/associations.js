const { sequelize } = require('./sequelize')
const Spot = require('../../models/spot')
const Comment = require('../../models/comment')
const User = require('../../models/user')

// associations
Spot.hasMany(Comment, { foreignKey: 'spotId_fk'})
Comment.belongsTo(Spot, { foreignKey: 'spotId_fk'})
User.hasMany(Spot, { foreignKey: 'userId_fk'})
Spot.belongsTo(User, { foreignKey: 'userId_fk'})
User.hasMany(Comment, { 
  foreignKey: 'userId_fk',
  constraints: false
})
Comment.belongsTo(User, { 
  foreignKey: 'userId_fk',
  constraints: false
})

// sync database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Synchronizing database...3..2..1...done')
    // Slug.create({ content: 'test slug...', id: '1', _fk: '1' })
    // Comment.create({ id: '1', content: 'test comment...', slugId_fk: '1' })
    // Comment.create({ id: '2', content: 'test comment 2...', slugId_fk: '1' })
  })
  .catch(err => console.log(err))


module.exports = {
  Spot,
  Comment,
  User
}