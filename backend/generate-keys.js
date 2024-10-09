const forge = require('node-forge');
const fs = require('fs');

function generateKeys() {
  // Generate a new key pair
  const keys = forge.pki.rsa.generateKeyPair(2048);

  // Create a certificate
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [{
    name: 'commonName',
    value: 'example.org'
  }, {
    name: 'countryName',
    value: 'US'
  }, {
    shortName: 'ST',
    value: 'Virginia'
  }, {
    name: 'localityName',
    value: 'Blacksburg'
  }, {
    name: 'organizationName',
    value: 'Test'
  }, {
    shortName: 'OU',
    value: 'Test'
  }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  // PEM-format keys and certificate
  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
  const certPem = forge.pki.certificateToPem(cert);

  // Save keys and certificate
  fs.writeFileSync('private_key.pem', privateKeyPem);
  fs.writeFileSync('public_key.pem', publicKeyPem);
  fs.writeFileSync('certificate.pem', certPem);

  console.log('Private Key:');
  console.log(privateKeyPem);
  console.log('\nPublic Key:');
  console.log(publicKeyPem);
  console.log('\nCertificate:');
  console.log(certPem);

  // Generate a key ID (kid)
  const kid = forge.util.bytesToHex(forge.random.getBytesSync(16));
  fs.writeFileSync('key_id.txt', kid);

  console.log('\nKey ID (kid):', kid);
}

generateKeys();