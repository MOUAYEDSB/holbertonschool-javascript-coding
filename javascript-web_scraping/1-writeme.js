#!/usr/bin/node
const fs = require('fs');

// Check if the user provided both a file path and a string to write
if (process.argv.length !== 4) {
  console.error('Usage: node 1-writeme.js <file_path> "<string_to_write>"');
  process.exit(1);
}

// Get the file path and string to write from the command line arguments
const filePath = process.argv[2];
const stringToWrite = process.argv[3];

// Write the string to the file in utf-8 encoding
fs.writeFile(filePath, stringToWrite, 'utf-8', (err) => {
  if (err) {
    // If an error occurred during writing, print the error object
    console.error(err);
  } else {
    console.log('File has been written successfully.');
  }
});
