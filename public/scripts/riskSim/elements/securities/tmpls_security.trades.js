(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.securityTrades = function (options) {
        var content = [],
        selectItems = rs.settings.dataModels.strategiesGTAM;
        if (options.isRSSupportADGroupMember === true) {
            content.push({
                c: 'security-trades-tools-panel', C: {
                    c: 'controls-container', C: {
                        c: 'input-group inline', C: [
                            {
                                c: 'form-control updating-trades-sbm-button',
                                C: tmpls.loadingButton({
                                    text: 'Update Strategy',
                                    name: 'btnUpdate',
                                    n: 'btnUpdateSubmit'
                                })
                            },
                            {
                                c: 'form-control',
                                C: tmpls.select({n: 'strategy', items: selectItems, title: 'Strategy:'})
                            }
                        ]
                    }
                }
            })
        }

        content.push({
            c: 'security-trades-content',
            n: 'securityTradesContentContainer',
            a: {id: 'securityTradesGrid'}
        });

        return {c: 'security-trades-content-wrapper' + (options.isRSSupportADGroupMember === true?' has-tools-panel':''), C: content};
    }

}(RS));