(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.securityPositions = function (data) {
        return [
            {
                c: 'security-prices-tools-panel', C: {
                c: 'controls-container', C: {
                    c: 'input-group inline', C: [
                        {
                            c: 'form-control',
                            C: tmpls.datePicker({
                                title: 'AsOfDate',
                                n: 'asOfDate',
                                name: 'AsOfDate',
                                value: data.asOfDateValue,
                                placeholder: 'Enter date'
                            })
                        },
                        {
                            c: 'form-control loading-positions-sbm-button',
                            //C: tmpls.button({text: 'Search', name: 'btnSearch', n: 'btnSubmit'})
                            C: tmpls.loadingButton({text: 'Search', name: 'btnSearch', n: 'btnSubmit'})
                        }
                    ]
                }
            }
            },
            {
                c: 'security-position-content-container',
                n: 'securityPositionContentContainer',
                a: {id: 'securityPositionsGrid'}
            }]
    };

}(RS));