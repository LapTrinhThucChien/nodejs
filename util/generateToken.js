module.exports = {
  generateHeader,
  generatePayload
};

const toBase64 = obj => {
  // convert obj to string 
  const str = JSON.stringify(obj);
  return Buffer.from(str).toString('base64');
};

const replaceSpecialChars = b64string => {
  return b64string.replace(/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
      case '=':
        return '';
      case '+':
        return '-';
      case '/':
        return '_';

      default:
        break;
    }
  });
};

const header = {
  alg: "HS256",
  typ: "JWT"
};

// generate header
const b64Header = toBase64(header);
const jwtB64Header = replaceSpecialChars(b64Header); // header token
function generateHeader(){
  return jwtB64Header;

}

// gerate payload
const payload = {
  exp: 872990,
  name: "Tam",
}

const b64Payload = toBase64(payload);
const jwtB64Payload = replaceSpecialChars(b64Payload)
function generatePayload(payload) {
  return replaceSpecialChars(toBase64(payload))
}


// // generate signature
// const crypto = require('crypto');
// const createSignature = (jwtB64Header, jwtB64Payload, secret) => {

//   // create HMAC (hase based message authentication code)
//   const signature = crypto.createHmac('sha256', secret);

//   const base64HeaderPayload = `${jwtB64Header}.${jwtB64Payload}`;
//   signature.update(base64HeaderPayload);

//   // signature need to be convert base64
//   signature = signature.digest('base64');

//   signature = replaceSpecialChars(signature);

//   return signature;

// }

// const secret = 'this is a secret key';
// const signature = createSignature(jwtB64Header, jwtB64Payload, secret);

// const jsonwebtoken = `${jwtB64Header}.${jwtB64Payload}.${signature}`;

// console.log(jsonwebtoken);
