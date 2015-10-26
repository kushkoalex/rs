(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.tradesUpdate = function () {
        return {
            c: 'trades-update-content-container', n: 'tradesUpdateContentContainer'
        }
    };


    tmpls.loadIntoRiskSim = function (data) {
        var content = {
            c: 'input-group inline', C: [
                {
                    c: 'form-control',
                    C: tmpls.multipleInput({n: 'evIds', title: 'EvIds'})
                },
                {
                    c: 'form-control',
                    C: tmpls.button({text: 'Clear', n: 'btnClear'})
                },
                {
                    c: 'form-control',
                    C: tmpls.loadingButton({text: 'Load', n: 'btnSubmit'})
                }
            ]
        };
        return tmpls.tradesUpdatePanel(content, data)
    };


    tmpls.updateTrades = function (data) {
        var selectItems = rs.settings.dataModels.strategies;
        var content = {
            c: 'input-group inline', C: [
                {
                    c: 'form-control',
                    C: tmpls.multipleInput({n: 'evIds', title: 'EvIds'})
                },
                {
                    c: 'form-control',
                    C: tmpls.select({n: 'strategy', items: selectItems, title: 'Strategy:'})
                },
                {
                    c: 'form-control',
                    C: tmpls.datePicker({
                        title: 'Nominal Settle Date:',
                        n: 'nominalSettleDate',
                        name: 'NominalSettleDate',
                        value: data.vpmPriceDateValue,
                        placeholder: 'Enter date'
                    })
                },
                {
                    c: 'form-control',
                    C: tmpls.button({text: 'Clear', n: 'btnClear'})
                },
                {
                    c: 'form-control',
                    C: tmpls.loadingButton({text: 'Load', n: 'btnSubmit'})
                }
            ]
        };
        return tmpls.tradesUpdatePanel(content, data)
    };

    tmpls.excludeTrades = function (data) {
        var selectItems = rs.settings.dataModels.process;
        var content = {
            c: 'input-group inline', C: [
                {
                    c: 'form-control',
                    C: tmpls.multipleInput({n: 'evIds', title: 'EvIds'})
                },
                {
                    c: 'form-control',
                    C: tmpls.select({n: 'process', items: selectItems, title: 'Process:'})
                },
                {
                    c: 'form-control',
                    C: tmpls.button({text: 'Clear', n: 'btnClear'})
                },
                {
                    c: 'form-control',
                    C: tmpls.loadingButton({text: 'Load', n: 'btnSubmit'})
                }
            ]
        };
        return tmpls.tradesUpdatePanel(content, data)
    };


    tmpls.tradesUpdatePanel = function (content, data) {
        return {
            c: 'trades-update-panel', C: [{c: 'header', t: data.title}, {
                c: 'content', n: data.n, C: [
                    {
                        c: 'message-wrapper', n: 'messagesWrapper'
                    },
                    content
                ]
            }]
        }
    };

}(RS));
