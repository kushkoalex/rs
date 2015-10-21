(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.securityTrades = function () {
        return {
            c: 'security-trades-content-container',
            n: 'securityTradesContentContainer',
            a: {id: 'securityTradesGrid'}
        }
    };

}(RS));