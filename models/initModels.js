const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { User } = require('./user.model');
const { Review } = require('./review.model');
// Establish your models relations inside this function
const initModels = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);
};
module.exports = { initModels };
