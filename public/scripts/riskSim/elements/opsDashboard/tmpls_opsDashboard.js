(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.opsDashboard = function(){
        return{
            c:'ops-dashboard-container',C:[{
                c: 'message-wrapper', n: 'messagesWrapper'
            },{
                c: 'form-control',
                C: tmpls.loadingButton({text: 'SignOff FX Rates', n: 'btnSubmit'})
            }]
        };
    }
}(RS));