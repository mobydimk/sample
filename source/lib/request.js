var api_prefix = '/api/';

var request = {

    get: function(url) {
        return this._send('GET', url);
    },

    post: function(url, data) {
        return this._send('POST', url, data);
    },

    put: function(url, data) {
        return this._send('PUT', url, data);
    },

    delete: function(url) {
        return this._send('DELETE', url);
    },

    _send: function(type, url, data = null) {
        return new Promise(
            (resolve, reject) => {
                $.ajax({
                    type,
                    url: api_prefix + url,
                    data,
                    success: (res) => resolve(res),
                    error: (res) => reject(res)
                })
            }
        )
    }
}

export default request;