(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.securityPrices = function (data) {
        return [
            {
                c: 'security-position-tools-panel', C: {
                c: 'controls-container', C: {
                    c: 'input-group inline', C: [
                        {
                            c: 'form-control',
                            C: tmpls.datePicker({
                                title: 'RiskSim Price Date:',
                                n: 'rsPriceDate',
                                name: 'RiskSimPriceDate',
                                value: data.rsPriceDateValue,
                                placeholder: 'Enter date'
                            })
                        },
                        {
                            c: 'form-control',
                            C: tmpls.datePicker({
                                title: 'Vpm Price Date:',
                                n: 'vpmPriceDate',
                                name: 'VpmPriceDate',
                                value: data.vpmPriceDateValue,
                                placeholder: 'Enter date'
                            })
                        },
                        {
                            c: 'form-control loading-prices-sbm-button',
                            C: tmpls.loadingButton({text: 'Search', name: 'btnSearch', n: 'btnSearchSubmit'})
                        },
                        {
                            c: 'form-control loading-prices-sbm-button',
                            C: tmpls.loadingButton({text: 'Update', name: 'btnUpdate', n: 'btnUpdateSubmit'})
                        }
                    ]
                }
            }
            },
            {
                c: 'security-prices-content-container',
                n: 'securityPricesContentContainer'
            }]
    };

    tmpls.securityPricesTable = function () {
        return {
            e: 'table', c:'data-table', C: [
                {
                    e: 'tr', c:'head', C: [
                    {e: 'th',C:{e:'input',n:'cbSelectAll',a:{type:'checkbox'}}},
                    {e: 'th',t:'Code'},
                    {e: 'th',t:'SecId'},
                    {e: 'th',t:'SyId'},
                    {e: 'th',t:'VpmSyCode'},
                    {e: 'th',t:'VpmStCode'},
                    {e: 'th',t:'RiskSim Price'},
                    {e: 'th',t:'VpmPriceDate'},
                    {e: 'th',t:'VpmPrice'},
                    {e: 'th',t:'AltPrice1'},
                    {e: 'th',t:'AltPrice2'},
                    {e: 'th',t:'AltPrice3'},
                    {e: 'th',t:'PriceType'},
                    {e: 'th',t:'EffectivePrice'}
                ]
                },
                {e:'tbody',n:'securityPricesTableContent'}
            ]
        }
    };

    tmpls.securityPricesTableItem = function (price) {
        return{e:'tr', c:price.odd===true?'odd':'' ,n:'row', C:[
            {e:'td',C:{e:'input',n:'cb' ,a:{type:'checkbox',name:price.SecId+'_#_'+price.PortfolioId+ '_#_' + price.VpmPriceDate + '_#_' + price.EffectivePrice+'_#_'+price.RsPriceDate},c:'riskSimPriceItemCheckbox'}},
            {e:'td',t:price.Code},
            {e:'td',t:price.SecId},
            {e:'td',t:price.SyId},
            {e:'td',t:price.VpmSyCode},
            {e:'td',t:price.VpmStCode},
            {e:'td',t:price.RsPrice},
            {e:'td',t:price.VpmPriceDate},
            {e:'td',t:price.VpmPrice},
            {e:'td',t:price.AltPrice1},
            {e:'td',t:price.AltPrice2},
            {e:'td',t:price.AltPrice3},
            {e:'td',t:price.PriceType},
            {e:'td',t:price.EffectivePrice}
        ]}
    }

}(RS));