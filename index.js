const core = require('@actions/core');
const { MongoClient, ServerApiVersion } = require('mongodb')
const fs = require('fs')

const main = async () => {
  try {
    const uri = core.getInput('uri', {required: true});
    const dbName = core.getInput('db', {required: true});
    const collectionName = core.getInput('collection', {required: true});
    const jsonFileName = core.getInput('export', {required: true});
    const shouldRewrite = core.getInput('should_rewrite');
    const data = fs.readFileSync(jsonFileName)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const docs = JSON.parse(data.toString());
    
    client.connect(err => {    
        const db = client.db(dbName);
        const collection = db.collection(collectionName)
        if(shouldRewrite == true)
            collection.deleteMany({});
        else 
            console.log("hi");
        collection.insertMany(docs, function(err, result) {
                if (err) throw err;
                console.log('Inserted docs:', result.insertedCount);
                client.close();
        });
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();