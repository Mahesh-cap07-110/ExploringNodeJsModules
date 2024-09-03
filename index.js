const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');

// Encrypt the string
function encryptString() {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update("Hello, Good Morning");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  console.log("Encrypted String:", encrypted.toString('hex'));
  console.log("Random UUID:", uuidv4());
}

// Read files using stream and normal fs
function readLargeFile() {
  console.time('Stream Read Time');
  const readableStream = fs.createReadStream('largefile.txt', { encoding: 'utf8' });
  readableStream.on('data', (chunk) => {
    console.log(chunk.length);
  });
  readableStream.on('end', () => {
    console.timeEnd('Stream Read Time');
  });

  console.time('Normal FS Read Time');
  fs.readFile('largefile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.timeEnd('Normal FS Read Time');
  });
}

// Print OS details
function printOSDetails() {
  console.log("OS Platform:", os.platform());
  console.log("OS CPU Architecture:", os.arch());
  console.log("System Uptime:", os.uptime(), "seconds");
  console.log("Free Memory:", os.freemem(), "bytes");
  console.log("Total Memory:", os.totalmem(), "bytes");
  console.log("Home Directory:", os.homedir());
  console.log("Host Name:", os.hostname());
}

// Get the command line argument
const [,, cmd] = process.argv;

switch (cmd) {
  case 'crypto':
    encryptString();
    break;
  case 'stream':
    readLargeFile();
    break;
  case 'os':
    printOSDetails();
    break;
  default:
    console.log("Invalid operation");
    break;
}
 