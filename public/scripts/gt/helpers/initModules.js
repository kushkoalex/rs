(function(gt){
    /**
     * init modules of namespace
     * @param {Object} namespace
     * @param {Array} [modules]
     */
    gt.initModules = function(namespace, modules){
        var modulesForInit = modules || namespace.modulesForInit,
            i = 0,
            iMax = modulesForInit.length;
        for (; i < iMax; i += 1){
            modulesForInit[i](namespace);
        }
    };
}(GT));
