# js-fetch
Simple fetch api for node js and client side


## How to install
```
    npm install --save git+https://github.com/synle/js-fetch.git
```


## Usage
### on server side
```
    const ajaxUtil = require('js-fetch');
```


### API
```
    ajaxUtil.getJson(url, body, inputHeaders, inputFetchOption);
    ajaxUtil.postJson(url, body, inputHeaders, inputFetchOption);
    ajaxUtil.putJson(url, body, inputHeaders, inputFetchOption);
    ajaxUtil.deleteJson(url, body, inputHeaders, inputFetchOption);
```
