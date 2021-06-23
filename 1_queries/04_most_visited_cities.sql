SELECT city, count(reservations.*) as reservations
FROM properties
JOIN reservations ON reservations.property_id = properties.id
GROUP BY city
ORDER BY reservations desc