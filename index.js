(function(){
    let do_fetch = fetch;

    if(!fetch){
        // require node fetch
        do_fetch = require('node-fetch');
    }

    const _sendRequest = (useJson, method, url, body, inputHeaders, inputFetchOption) => {
        const headers = Object.assign(
            {
                'Accept': useJson === true ? 'application/json' : 'text/plain',
                'Content-Type': 'application/json'
            },
            inputHeaders
        );
     
        const fetchOptions = Object.assign(
            {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
                mode: 'cors',
                credentials: 'include'
            },
            inputFetchOption
        );
     
        let finalResp;
        return do_fetch(
            url,
            fetchOptions
        )
            // json the object
            .then((response) => {
                // skeleton for the final resp
                finalResp = {
                    ok: response.ok,
                    status: response.status
                };
     
                if (useJson === true) {
                    return response.json();
                }
     
                return response.text();
            })
            .then((responseBody) => {
                // capture the result in body
                finalResp.body = responseBody;
     
                if (finalResp.ok === true) {
                    return finalResp;
                } else {
                    throw finalResp;
                }
            });
    };
 
    const ajaxUtil = {
        // get stuffs as json
        getJson: _sendRequest.bind(null, true, 'GET'),
        postJson: _sendRequest.bind(null, true, 'POST'),
        putJson: _sendRequest.bind(null, true, 'PUT'),
        deleteJson: _sendRequest.bind(null, true, 'DELETE'),
     
        // get stuffs as plain text
        getText: _sendRequest.bind(null, false, 'GET'),
        postText: _sendRequest.bind(null, false, 'POST'),
        putText: _sendRequest.bind(null, false, 'PUT'),
        deleteText: _sendRequest.bind(null, false, 'DELETE')
    };

    if(typeof module !== 'undefined' && module && module.exports){
        // export for node
        module.exports = ajaxUtil;
    } else {
        // export for js client side
        window.ajaxUtil = ajaxUtil;
    }
})()
