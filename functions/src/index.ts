import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

const app = express();
admin.initializeApp();

app.get('/', (req, res) => res.send('Hello world'));

app.post('/logrequest', async (request, response) => {
  try {
      const data = JSON.parse(JSON.stringify(request.body));
      const headers: Array<Array<string>> =  data.headers;
      const headerObjectArray: Array<object> = [];

      headers.forEach(headerArray => {
        const headerObject = {
          key: headerArray[0],
          value: headerArray[1]
        }

        headerObjectArray.push(headerObject);
      });

      const dataWithHeaders = data;
      dataWithHeaders.headers = headerObjectArray;

      const dbObject = {
        date: new Date().toISOString(),
        request: dataWithHeaders
      };

      await admin.firestore().collection('logs').add(dbObject);
      
      // response.send(dataWithHeaders);
      response.send("Success");
  }
  catch (error) {
      console.log("Request errored");
      console.log(error);
      response.send("Response errored: "+ error);
  }
});

exports.api = functions.region('europe-west1').https.onRequest(app);