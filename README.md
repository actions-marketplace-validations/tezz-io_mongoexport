# Mongo export
Export a json file to a collection

# Usage

1. Checkout
2. use tezz-io/mongoexport@master

with ->
1. uri - in the format `mongodb+srv://<username>:<password>@<cluster-name>.xxxxx.mongodb.net`
2. export - path of json from root
3. db - name of db
4. collection - name of collection
5. rewrite - true for rewrite, false for append

```yml
name: Mongo Export

on: 
  push:
  pull_request:

jobs:
  mongoexport:
    runs-on: ubuntu-latest
    name: Export MongoDB Json file
    steps:
      - uses: actions/checkout@v2
      - name: Export Json
        uses: tezz-io/mongoexport@master
        with:
          uri: ${{ secrets.MONGO_URI }}
          export: a.json
          db: testDB
          collection: test
          rewrite: true
```
