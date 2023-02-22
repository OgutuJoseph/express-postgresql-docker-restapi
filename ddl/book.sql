DROP TABLE IF EXISTS book;

CREATE TABLE book (
    id VARCHAR(36) PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    year_published INTEGER NOT NULL,
    added_dttm TIMESTAMP DEFAULT NOW()
);