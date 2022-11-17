

DROP DATABASE IF EXISTS yape;
CREATE DATABASE yape;
\c yape;

CREATE TYPE trxType AS ENUM('charge');
CREATE TYPE trxStatus AS ENUM('pending', 'approved', 'rejected');

CREATE TABLE Transactions (
    transactionExternalId     VARCHAR(36)     NOT NULL,
    transactionType            trxType         NOT NULL,
    transactionStatus          trxStatus       NOT NULL,
    amount                      DECIMAL(10, 2)  NOT NULL,
    createdAt                  VARCHAR(20)     NOT NULL,
    PRIMARY KEY (transactionExternalId)
);