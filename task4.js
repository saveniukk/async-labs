const fs = require('fs');

const inputFile = 'input_file.txt';
const outputFile = 'output_file.txt';

const readStream = fs.createReadStream(inputFile, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outputFile);

let buffer = '';

readStream.on('data', (part) => {
  buffer += part;

  const lines = buffer.split('\n');

  for (let i = 0; i < lines.length - 1; i++) {
    const processedLine = lines[i].toUpperCase();
    writeStream.write(processedLine + '\n');
  }

  buffer = lines[lines.length - 1];
});

readStream.on('end', () => {
  if (buffer) {
    const processedLine = buffer.toUpperCase();
    writeStream.write(processedLine + '\n');
  }

  console.log('File processing completed.');
  writeStream.end();
});

readStream.on('error', (err) => {
  console.error('Error during reading file:', err);
});

writeStream.on('error', (err) => {
  console.error('Error during writing file:', err);
});
