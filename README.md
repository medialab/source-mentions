# source-mentions
source project — analysing schenghen's events from actors mentions 

![preview](preview.png?raw=true)


### 1. Query the heurist database

1. Connect to heurist instance using login and password.
2. type the query in the search field : `type:1 field:6:5467 or t:10 or t:20`

About the query : 
- `type:1 field:6:5467` to get **relationships** with **is mention by** as predicate (relationships `typeId` is `5467`)
- `t:10 or t:20` to get **persons** and **events** nodes

*The data can be checked using the connection tab who displays the query result as a network. A raw gexf can also be downloaded from there but the metadata form the relationships are missed during the export.*

### 2. Export query as json 

- From the **Report** tab select the `JSON-mentions` as template. 
- The [template source code](./scripts/JSON-mentions.tpl ) can be edited form heurist to add new data to the report.
- You can **copy paste** the query result in JSON from the preview or use the **report publication** helper to get the direct url of the JSON file.
- *If you want to access the data using AJAX from the JSON api-like url [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) should be configured on the server and data should be declared as public in heurist.*

### 3. Run dev server

1. `git clone git@github.com:medialab/source-mentions.git`
2. `cd source-mentions/`
3. add data in `./data/data.json`
4. `npm i`
5. `npm start` to lanch dev server powered by [Kotasu](https://github.com/Yomguithereal/kotatsu)
6. the app is up at [`http://localhost:3000`](http://localhost:3000)

### 4. Build production app 

1. `npm run build`
2. the build version will be found in `./build`

### 5. Host the app 
- copy `./build` and `./index.html` to any webserver. 
- Be aware the data is embed in the build.

## sketch
![drawing](https://docs.google.com/drawings/d/1aUfi24O6_7uMkZKg-R4HmZElXyE-A8Ar3fIHA9juyXg/pub?w=1445&h=646)
