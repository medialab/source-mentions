# source-mentions
source project — analysing schenghen's events from actors mentions 

### Query the heurist database
Connect to heurist instance using login and password.

To get the data we need to ask for :

- **relationships** with **is mention by** as predicate (`type:1 field:6:5467`)
- **persons** and **events** (`t:10 or t:20`)

Complete query : `type:1 field:6:5467 or t:10 or t:20`

    We can the **control the data** using the connection tab who displays the query result as a network. A raw gexf can also be downloaded from there but the metadata form the relationships are missed during the export.

### export query as json 

- From the **Report** tab select the `JSON-mentions` as template. 
- The [template source code](./scripts/JSON-mentions.tpl ) can be edited to add new field to the report.
- You can **copy paste** the result from the preview or use the **report publication** helper to get the url of the JSON file.

### run dev server

1. `git clone git@github.com:medialab/source-mentions.git`
2. `cd source-mentions/`
3. add data in `./data/data.json`
4. `npm i`
5. `npm start` to lanch dev server powered by [Kotasu](https://github.com/Yomguithereal/kotatsu)
6. the app is up at [`http://localhost:3000`](./scripts/JSON-mentions.tpl )

### build production app 

1. `npm run build`
2. the build version will be found in `./build`

### host the app 
- copy `./build` and `./index.html` to any webserver. 
- Be aware the data is embed in the build.

## sketch
![drawing](https://docs.google.com/drawings/d/1aUfi24O6_7uMkZKg-R4HmZElXyE-A8Ar3fIHA9juyXg/pub?w=1445&h=646)
