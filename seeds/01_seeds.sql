-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS properties CASCADE;
-- DROP TABLE IF EXISTS reservations CASCADE;
-- DROP TABLE IF EXISTS property_reviews CASCADE;

INSERT INTO users VALUES (1, 'kevin', 'kevin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(2, 'andres', 'andres@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(3, 'anthony', 'anthony@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties 
VALUES (1, 1, 'blue', 'text', 'link', 'link', 100, 2, 3, 5, 'canada', '22 full ave.', 'toronto', 'ontario', 'l3u2i1', 'yes'),
(2, 3, 'red', 'text', 'link', 'link', 30, 1, 1, 2, 'brazil', 'hello ave.', 'san paolu', 'farfaraway', '34932k', 'yes'),
(3, 1, 'colors', 'text', 'link', 'link', 50, 0, 2, 2, 'australia', 'main st.', 'melbourne', 'province', '33213', 'no');

INSERT INTO reservations
VALUES (1, '01/23/2022', '01/25/2022', 3, 2),
(2, '07/11/2021', '08/11/2021', 2, 3),
(3, '11/23/2022', '12/15/2022', 1, 1);

INSERT INTO property_reviews
VALUES (1, 1, 3, 2, 10, 'message'),
(2, 2, 2, 1, 5, 'message'),
(3, 3, 3, 2, 6, 'message');
