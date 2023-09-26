#!/usr/bin/node

const request = require('request');

// Check if the user provided the movie ID as a command line argument
if (process.argv.length !== 3) {
  console.error('Usage: node 101-starwars_characters.js <Movie_ID>');
  process.exit(1);
}

// Get the movie ID from the command line argument
const movieID = process.argv[2];

// Define the URL for the Star Wars API
const apiUrl = `https://swapi.dev/api/films/${movieID}/`;

// Function to fetch and print characters for the given movie ID
function fetchAndPrintCharacters (url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      process.exit(1);
    }

    // Parse the JSON response
    const data = JSON.parse(body);

    // Retrieve the character URLs in the same order as the list "characters" in the /films/ response
    const characterUrls = data.characters;

    // Function to fetch and print character names
    function fetchCharacterName (index) {
      if (index >= characterUrls.length) {
        // All characters have been printed
        return;
      }

      const characterUrl = characterUrls[index];
      request(characterUrl, (charError, charResponse, charBody) => {
        if (charError) {
          console.error('Error:', charError);
          process.exit(1);
        }

        const characterData = JSON.parse(charBody);
        console.log(characterData.name);

        // Continue to the next character
        fetchCharacterName(index + 1);
      });
    }

    // Start fetching and printing character names
    fetchCharacterName(0);
  });
}

// Fetch and print characters for the specified movie
fetchAndPrintCharacters(apiUrl);
