# CSCE-3444-project

## Project Outbreak
Project Outbreak is a web application that allows a user to simulate a disease outbreak in the U.S. The user can visually watch the disease spread over a map of the U.S. It also features live updates, statistics and maps dealing with Covid-19.

## Setup
To set up the database and run the application, read the instructions below.

1. Have Node.js installed on your machine. To download Node.js, go here: https://nodejs.org/en/download/
2. After you have Node.js installed on your machine, install MySQL workbench and MySQL server here: https://dev.mysql.com/downloads/windows/installer/8.0.html
3. Clone or extract the respository.
4. In “MySQL-password.txt”, enter and save the password you chose when installing MySQL server.
5. After you have MySQL workbench and MySQL server installed on your machine, type "node createDatabase.js" on the command line (make sure
that you are in the directory that createDatabase.js is in). This script will create a database for the application.
6. Type "node server.js" to run the server for the application.
7. To access the application, open a web browser and type "localhost:3000".