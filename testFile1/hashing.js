// Hashing using crypto module in nodejs and finding the input that produces a hash with a prefix of entered number of zeros .

// Key Note
// crypto.createHash('sha256')
// .update()
// .digest('hex')

import crypto from "crypto";

function hashedInput(prefix) {
  let input = 0;
  while (true) {
    let hash = crypto.createHash("sha256").update(input.toString()).digest("hex");
    if (hash.startsWith(prefix)) {
      return { input: input, hash: hash };
    }
    input++;
  }
}

const result = hashedInput("0000");
console.log("Input:", result.input);
console.log("Hash:", result.hash);
