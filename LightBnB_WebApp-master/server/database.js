const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const values = [email];
  return pool.query(`SELECT * FROM users
                    WHERE email = $1;`, values)
    .then(res => {
      const user = res.rows[0];
      if (!user) {
        return null;
      }
      return user;
    })
    .catch(err => console.log(err));
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const values = [id];
  return pool.query(`SELECT * FROM users
                    WHERE id = $1;`, values)
    .then(res => {
      const user = res.rows[0];
      if (!user) {
        return null;
      }
      return user;
    })
    .catch(err => console.log(err));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const info = [user.name, user.email, user.password];
  return pool.query(`INSERT INTO users (name, email, password)
                      VALUES ($1, $2, $3)
                      RETURNING *;`, info)
    .then(res => {
      return res.rows[0] || null;
    })
    .catch(err => console.log(err));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const info = [guest_id, limit];
  return pool.query(`SELECT * FROM reservations
                    JOIN properties ON property_id = properties.id
                    WHERE guest_id = $1
                    LIMIT $2;`, info)
    .then(res => {
      console.log(res.rows);
      return res.rows || null;
    })
    .catch(err => console.log(err));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night BETWEEN $${queryParams.length -1} AND $${queryParams.length}`;
  }
   
  queryString += `
  GROUP BY properties.id`;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(rating) > $${queryParams.length}
    `;
  }
  
  queryParams.push(limit);
  queryString += ` ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows || null;
    });
 
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const info = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];
  return pool.query(`INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                      RETURNING *;`, info)
    .then(res => {
      return res.rows[0] || null;
    })
    .catch(err => console.log(err));
}
exports.addProperty = addProperty;
