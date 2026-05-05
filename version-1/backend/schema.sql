CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS food_data (
    id SERIAL PRIMARY KEY,
    food VARCHAR(255) NOT NULL,
    calorie DECIMAL(10, 2) NOT NULL,
    fat DECIMAL(10, 2) NOT NULL,
    saturated_fat DECIMAL(10, 2) NOT NULL,
    monounstaturated_fat DECIMAL(10, 2) NOT NULL,
    polyunsaturated_fat DECIMAL(10, 2) NOT NULL,
    carbohydrates DECIMAL(10, 2) NOT NULL,
    sugar DECIMAL(10, 2) NOT NULL,
    protein DECIMAL(10, 2) NOT NULL,
    fiber DECIMAL(10, 2) NOT NULL,
    cholesterol DECIMAL(10, 2) NOT NULL,
    sodium DECIMAL(10, 2) NOT NULL,
    water DECIMAL(10, 2) NOT NULL,
    vitamin_a DECIMAL(10, 2) NOT NULL,
    vitamin_b1 DECIMAL(10, 2) NOT NULL,
    vitamin_b11 DECIMAL(10, 2) NOT NULL,
    vitamin_b12 DECIMAL(10, 2) NOT NULL,
vitamin_b2 DECIMAL(10, 2) NOT NULL,
vitamin_b3 DECIMAL(10, 2) NOT NULL,
vitamin_b5 DECIMAL(10, 2) NOT NULL,
vitamin_b6 DECIMAL(10, 2) NOT NULL,
vitamin_c DECIMAL(10, 2) NOT NULL,
vitamin_d DECIMAL(10, 2) NOT NULL,
vitamin_e DECIMAL(10, 2) NOT NULL,
vitamin_k DECIMAL(10, 2) NOT NULL,
calcium DECIMAL(10, 2) NOT NULL,
copper DECIMAL(10, 2) NOT NULL,
iron DECIMAL(10, 2) NOT NULL,
magnesium DECIMAL(10, 2) NOT NULL,
manganese DECIMAL(10, 2) NOT NULL,
phosphorus DECIMAL(10, 2) NOT NULL,
potassium DECIMAL(10, 2) NOT NULL,
selenium DECIMAL(10, 2) NOT NULL,
zinc DECIMAL(10, 2) NOT NULL,
nutrition_density DECIMAL(10, 2) NOT NULL
);

COPY food_data 
 FROM '/food-data/FOOD-DATA-GROUP1.csv'
 WITH (FORMAT csv, HEADER true);

 COPY food_data 
 FROM '/food-data/FOOD-DATA-GROUP2.csv'
 WITH (FORMAT csv, HEADER true);
 
 COPY food_data 
 FROM '/food-data/FOOD-DATA-GROUP3.csv'
 WITH (FORMAT csv, HEADER true);
 
 COPY food_data 
 FROM '/food-data/FOOD-DATA-GROUP4.csv'
 WITH (FORMAT csv, HEADER true);
 
 COPY food_data 
 FROM '/food-data/FOOD-DATA-GROUP5.csv'
 WITH (FORMAT csv, HEADER true);
 
 
