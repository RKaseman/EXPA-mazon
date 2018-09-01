
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "climazon_db"
});


connection.connect(function(error) {
    if (error) throw error;
    console.log("\nconnection.threadId = " + connection.threadId + "\n");
    search();
});


function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Select an option",
        choices: [
            "Find a planet",
            "Find a planet name by letters",
            "Buy a planet"
        ]
    })
    .then(function (answers) {
        switch (answers.choiceOne) {
            case "Find a planet":
            // console.log("\n");
            findPlanet();
            break;

            case "Find a planet name by letters":
            console.log("\n");
            findPlanetAlpha();
            break;

            case "Buy a planet":
            console.log("\n");
            buyPlanet();
            break;
        }
    });
};


function findPlanet() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Enter the planet's name"
    })
    .then(function (answers) {
        console.log("\n");
        var planetName = "SELECT rowid, fpl_discmethod, fpl_disc FROM planets WHERE ?";
        connection.query(planetName, { fpl_name: answers.planet }, function (error, response) {
        console.log(response);
            for (var i = 0; i < response.length; i++) {
                console.log("\nFull name: " + response[i].fpl_name
                + ",\nDiscovery Method: " + response[i].fpl_discmethod
                + ",\nDiscovery Year: " + response[i].fpl_disc);
            }
            search();
        });
    });
};

function findPlanetAlpha() {
    inquirer.prompt({
        type: "input",
        name: "planetAlpha",
        message: "Select letters to search",
    })
    .then(function (answers) {
        console.log("\n");
        var letterSearch = "SELECT * FROM planets WHERE fpl_name LIKE [answers.planetAlpha]%";
        console.log("letterSearch = ", letterSearch);
        connection.query(letterSearch, { fpl_name: answers.planetAlpha }, function (error, response) {
            console.log(response);
            for (var j = 0; j < response.length; j++) {
                console.log("\nPlanet names: " + response[j].fpl_name
                + ",\nDiscovery Year: " + response[j].fpl_disc
                + ",\nAge: " + response[j].fst_age);
            }
            search();
        });
    });
};

//     inquirer.prompt([
//         {
//             type: "input",
//             name: "bid",
//             message: "Your Bid"
//         }
//     ])

//     function newEntry() {
//         var itemString = process.argv.slice(2, [process.argv.length - 1]).join(" ");
//         console.log("itemString = " + itemString);

//         var grabValue = parseInt(process.argv[process.argv.length - 1]);
//         console.log("grabValue = " + grabValue);
//         // console.log("Creating Item...");

//         var query = connection.query(
//             "INSERT INTO auctions SET ?",
//             {
//                 item: itemString,
//                 itemValue: grabValue
//             },
//             function(error, response) {
//                 if (error) throw error;
//                 console.log("error = " + error);
//                 console.log("response.affectedRows = " + response.affectedRows + " item added.\n")

//         });
//     };


//     // updateEntry();


//     function updateEntry() {

//         var query = connection.query(
//             "UPDATE auctions SET itemValue WHERE item = query.sql",
//             [{
//                 itemValue: query.sql
//             }],
//             function(error, response) {
//                 if (error) throw error;
//                 console.log("error = " + error);
//                 console.log("response.affectedRows = " 
//                     + response.affectedRows 
//                     + " updated.\n")

//         });
//         console.log("Updated bid: " + itemValue);
//     };


//     // readDB();


//     function readDB() {
//         console.log("Searching...");

//         connection.query(
//             "SELECT * FROM auctions", function(error, response) {
//             if (error) throw error;
//             console.log(response);
//             console.log("success!");

//             });
//     };


    // connection.end();



