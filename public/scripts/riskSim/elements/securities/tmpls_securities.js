(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;


    tmpls.securities = function () {
        return [
            tmpls.securitySearchInputs(),
            tmpls.securitySearchResultList(),
            tmpls.securityInfoWrapper()
        ]
    };

    tmpls.securityInfoWrapper = function () {
        // TODO: uncomment
        //return {c:'security-info-wrapper hidden',n:'securityInfoContainer'}
        return [{
            c: 'message-wrapper', n: 'messagesWrapper'
        }, {
            c: 'security-info-wrapper', n: 'securityInfoWrapper', C: [
                tmpls.securitiesMenu(),
                tmpls.securityInfoContainer()
            ]
        }]
    };

    tmpls.securityInfoContainer = function () {
        return {c: 'security-info-container', n: 'securityInfoContainer'}
    };

    tmpls.securitiesMenu = function () {
        var menu = [
                {title: 'Indic', n: 'indicTab'},
                {title: 'Positions', n: 'positionsTab'},
                {title: 'Trades', n: 'tradesTab'},
                {title: 'Prices', n: 'pricesTab'}
            ],
            i;

        var menuItems = [];
        var className;
        for (i = 0; i < menu.length; i++) {
            className = 'menu-item';
            if (i === 0) {
                className += ' first';
            }
            if (i === menu.length - 1) {
                className += ' last';
            }
            menuItems.push({
                e: 'li',
                n: menu[i].n,
                c: className,
                C: [{e: 'a', h: '#', t: menu[i].title}, {c: 'arrow', C: {c: 'inner'}}]
            })
        }

        return {c: 'securities-menu', C: {e: 'ul', C: menuItems}}
    };

    tmpls.securitySearchInputs = function () {

        var selectItems = rs.settings.dataModels.securityIdType;
        return {
            c: 'security-search-inputs-wrapper', C: {
                c: 'input-group inline', C: [
                    {c: 'form-control', C: tmpls.input({n: 'secId', placeholder: 'SecID', title: 'Security ID:'})},
                    {c: 'form-control', C: tmpls.select({n: 'secIdType', items: selectItems, title: 'SecID Type:'})}
                ]
            }
        }
    };

    tmpls.securitySearchResultList = function () {
        return {
            c: 'security-search-result-list',
            C: {e: 'table', c:'data-table', n: 'securityResultTable', a: {id: 'securityResultTable'}}
        }
    };

    tmpls.securityListHead = function (columns) {
        var $columns = [],
            i;
        for (i = 0; i < columns.length; i++) {
            $columns.push({e: 'td', t: columns[i]})
        }

        return {e: 'tr', c: 'head', C: $columns}
    };

    tmpls.securityListItem = function (item) {
        var trClassName = item.odd ? 'odd' : '';
        return {
            e: 'tr', a: {'data-value': item.SecId},
            c: trClassName,
            C: [{e: 'td', t: item.SecId}, {e: 'td', t: item.VpmId}, {e: 'td', t: item.VpmSyCode}]
        }
    }


}(RS));
