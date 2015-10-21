(function (rs) {
    var tmpls = rs.tmpls;
    tmpls.button = function (options) {
        return {c:'input-wrapper',C:{c:'sbm-button-wrapper',C:[{c:'loading-indicator',C:{c:'indicator'}},{c:'button noselect',t:options.text,n:options.n}]} };
    }
}(RS));

