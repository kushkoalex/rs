GT.ready(function(gt,global){
    var rs = global.RS,
        $dashboard = gt.$('dashboard'),
        $securities = gt.$('securities'),
        $tradesUpdate = gt.$('tradesUpdate'),
        $pnlUpdate = gt.$('pnlUpdate');

    global.cnCt.bindTemplates(rs.tmpls);

    gt.initModules(rs);

    if ($dashboard !== null) {
        rs.dashboard($dashboard);
    }
    if ($securities !== null) {
        rs.securities($securities);
    }
    if ($tradesUpdate !== null) {
        rs.tradesUpdate($tradesUpdate);
    }
    if ($pnlUpdate !== null) {
        rs.pnlUpdate($pnlUpdate);
    }
});