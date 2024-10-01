const admin = require('firebase-admin');

const serviceAccount = require('firebase-adminsdk-poi3q@empel-1.iam.gserviceaccount.com');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mydb.firebaseio.com"
});

module.exports = admin;
