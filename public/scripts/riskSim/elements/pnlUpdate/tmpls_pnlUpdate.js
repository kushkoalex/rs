(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;


    tmpls.pnlUpdate = function () {
        return {
                c: 'pnl-update-content-container', C: [ {
                c: 'message-wrapper', n: 'messagesWrapper'
            },
                {c: 'status', a: { id: 'statusDetails' },t:'status:'},
                {
                    c: 'input-group inline', C: [
                    {
                        c: 'form-control',
                        C: tmpls.datePicker({
                            title: 'Run Date:',
                            n: 'runDate',
                            name: 'RunDate',
                            value: rs.settings.controlsDescriptors.securities.prevBusinessDay,
                            placeholder: 'Enter date'
                        })
                    },
                    {
                        c: 'form-control',
                        C: tmpls.multipleInput({n: 'portfolios', title: 'Portfolios:'})
                    },
                    {
                        c: 'form-control',
                        C: tmpls.multipleInput({n: 'securityIds', title: 'SecurityIds'})
                    },
                    {
                        c: 'form-control',
                        C: tmpls.loadingButton({text: 'Run', n: 'btnSubmit'})
                    }
                ]
                }
            ]
            }
    }


}(RS));