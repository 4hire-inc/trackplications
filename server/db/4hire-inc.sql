-- ElepantSQL database dump 

CREATE TABLE Users (
UserID varchar(255) NOT NULL PRIMARY KEY, 
Email varchar(255),
Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE  FUNCTION updated_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.Modified_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER updated_time_trigger
    BEFORE UPDATE
    ON
        Users
    FOR EACH ROW
EXECUTE PROCEDURE updated_time();


CREATE TABLE Applications (
id int NOT NULL PRIMARY KEY, 
User_ID varchar(255),
FOREIGN KEY (User_ID) REFERENCES Users(UserID),
Company varchar(255),
Location varchar(255),
Position varchar(255),
Notes varchar(500),
Status_ID int,
FOREIGN KEY (Status_ID) REFERENCES Status(id),
Offer_ID int,s
FOREIGN KEY (Offer_ID) REFERENCES Offer(id),
Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TRIGGER updated_time_trigger
    BEFORE UPDATE
    ON
        Applications
    FOR EACH ROW
EXECUTE PROCEDURE updated_time();



CREATE TABLE Offers (
id int NOT NULL PRIMARY KEY, 
Salary int, 
Sign_on_bonus int, 
Start_date varchar(255), 
Notes varchar(500),
Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TRIGGER updated_time_trigger
    BEFORE UPDATE
    ON
        Offers
    FOR EACH ROW
EXECUTE PROCEDURE updated_time();



CREATE TABLE Status (
id int NOT NULL PRIMARY KEY, 
Status_name varchar(255),
Status_rank varchar(255),
Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 


CREATE TRIGGER updated_time_trigger
    BEFORE UPDATE
    ON
        Status
    FOR EACH ROW
EXECUTE PROCEDURE updated_time();
