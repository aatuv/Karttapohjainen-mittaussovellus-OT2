CREATE TABLE Provider 
(
    ID INT IDENTITY PRIMARY KEY,
    Info NVARCHAR(128),
    Name NVARCHAR(128),
    Owner NVARCHAR(128),
    IsPublicDomain BIT NOT NULL,
    Created DATETIME NOT NULL,
    Tag NVARCHAR(128),
    Location GEOGRAPHY
)
CREATE TABLE Sensor
(
    ProviderID INT REFERENCES Provider (ID) IDENTITY PRIMARY KEY,
    Tag NVARCHAR(128) NOT NULL,
    Name NVARCHAR(128),
    Description NVARCHAR(128),
    Rounding INT,
    Unit NVARCHAR(128),
)
CREATE TABLE Measurement
(
    ID INT IDENTITY PRIMARY KEY,
    ProviderID INT REFERENCES Provider (ID),
    Object NVARCHAR(128), 
    Tag NVARCHAR(128),
    Timestamp DATETIMEOFFSET(7) NOT NULL,
    Note NVARCHAR(128),
    Location GEOGRAPHY,
    RowCreatedTimestamp DATETIMEOFFSET(7)
) 
  
CREATE TABLE Data
(
    MeasurementID BIGINT REFERENCES Measurement (ID) IDENTITY PRIMARY KEY,
    Tag NVARCHAR(128) NOT NULL,
    Value FLOAT,
    LongValue BIGINT,
    TextValue NVARCHAR(MAX),
    BinaryValue VARBINARY(MAX),
    XmlValue xml
) 