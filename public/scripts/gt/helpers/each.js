(function(gt){
    var isNative = Array.forEach;
    /**
     *
     * @param {Array|Object|String} eachable
     * @param {Function} fn fn calls fn(item, key, list)
     * @param {*} [ctx] fn ctx
     */
    gt.each = function(eachable, fn, ctx){
        var _ctx = ctx || gt,
            i,
            iMax;
        if (eachable){
            if (typeof eachable === 'string'){
                for (i = 0, iMax = eachable.length; i < iMax; i += 1) {
                    fn.call(_ctx, eachable.charAt(i), eachable);
                }
            } else if (gt.isArray(eachable)){
                if (isNative){
                    eachable.forEach(fn, _ctx);
                } else{
                    for (i = 0, iMax = eachable.length; i < iMax; i += 1){
                        fn.call(_ctx, eachable[i], i, eachable);
                    }
                }
            } else{
                for (var p in eachable){
                    if (eachable.hasOwnProperty(p)){
                        fn.call(_ctx, eachable[p], p, eachable);
                    }
                }
            }
        }
    };

}(GT));