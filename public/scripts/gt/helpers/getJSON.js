(function(global, gt){
    var jsonRequestSettings = {
            method: 'GET',
            url: '',
            onSuccess: function(success, onSuccessCallback){
                if (typeof success === 'string'){
                    onSuccessCallback.call(this, global.JSON.parse(success));
                } else{
                    onSuccessCallback.call(this, success);
                }
            },
            onError: null
        };
    /**
     *
     * @param {String} url
     * @param {Function} onSuccess
     * @param {Function} [onError]
     * @param {Object|Array} [ctx]
     * @returns {XMLHttpRequest}
     */
    gt.getJSON = function(url, onSuccess, onError, ctx){
        jsonRequestSettings.url = url;
        jsonRequestSettings.onError = onError;
        return gt.request(jsonRequestSettings, onSuccess, ctx);
    };
}(this, GT));
