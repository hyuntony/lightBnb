SELECT properties.id as id, cost_per_night, start_date, avg(rating) as average_rating
FROM users
JOIN reservations ON reservations.guest_id = users.id
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::DATE
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10