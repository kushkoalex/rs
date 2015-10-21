RS.tradesUpdate = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        doc = global.document,
        loadIntoRiskSim,
        updateTrades,
        excludeTrades,
        build,
        u;


    build = tp('tradesUpdate', $parent);
    var $container = build.tradesUpdateContentContainer;


    loadIntoRiskSim = tp('loadIntoRiskSim', {title: 'Load Into RiskSim', n:'loadIntoRiskSim'}, $container);
    updateTrades = tp('updateTrades', {title:'Update Trades', n:'updateTrades'}, $container);
    excludeTrades = tp('excludeTrades', {title:'Exclude Trades', n:'excludeTrades'}, $container);

    rs.loadIntoRiskSim(loadIntoRiskSim);
    rs.updateTrades(updateTrades);
    rs.excludeTrades(excludeTrades);
};