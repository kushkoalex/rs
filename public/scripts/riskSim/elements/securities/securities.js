RS.securities = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        build = tp('securities', $parent),
        $popupMessagesWrapper = build.messagesWrapper,
        loadingPositionsErrorText = 'Error loading security positions',
        updatingSecurityErrorText = 'Error updating security',
        loadingTradesErrorText = 'Error loading security trades',
        loadingPricesErrorText = 'Error loading security prices',
        updatingPricesErrorText = 'Error updating security prices',
        loadingIndicErrorText = 'Error loading security indic',
        loadingSecuritiesErrorText = 'Error loading securities',
        securityInfoWrapperEmptyText = 'Please select the security from the list',
        $secId,
        $secIdType,
        $securityInfoWrapper,
        $securityInfoContainer,
        $securityPositionContentContainer,
        $securityTradesContentContainer,
        $securityPricesContentContainer,
        $rsPriceDate,
        $vpmPriceDate,
        $btnSearchSubmit,
        $btnUpdateSubmit,
        $fragment,
        $securityResultTable,
        securityListItem,
        selectedSecurityId = null,
        tabs,
        currentTab,
        u;


    $secId = build.secId;
    $secIdType = build.secIdType;
    $securityResultTable = build.securityResultTable;
    $securityInfoWrapper = build.securityInfoWrapper;
    $securityInfoContainer = build.securityInfoContainer;


    var initTabs = function () {
        tabs = {
            $indicTab: {n: build.indicTab, fn: indicTabClick},
            $positionsTab: {n: build.positionsTab, fn: positionsTabClick},
            $tradesTab: {n: build.tradesTab, fn: tradesTabClick},
            $pricesTab: {n: build.pricesTab, fn: pricesTabClick}
        };

        for (var tab in tabs) {
            gt.addEvent(tabs[tab].n, eventOnPointerEnd, tabs[tab].fn);
        }
    };

    var setSubMenuItemsInactive = function () {
        var items = gt.$c('menu-item');
        for (var i = 0; i < items.length; i++) {
            gt.removeClass(items[i], 'active')
        }
    };

    var setCurrentMenuItemActive = function (element) {
        setSubMenuItemsInactive();
        var $item = gt.getParentBy(element, 'tagName', 'LI', true);
        gt.addClass($item, 'active');
    };

    var indicTabClick = function (e) {
        setCurrentMenuItemActive(e.target);
        loadDetails();
        currentTab = 1;
    };

    var positionsTabClick = function (e) {
        setCurrentMenuItemActive(e.target);
        loadPositions();
        currentTab = 2;
    };

    var tradesTabClick = function (e) {
        setCurrentMenuItemActive(e.target);
        loadTrades();
        currentTab = 3;
    };

    var pricesTabClick = function (e) {
        setCurrentMenuItemActive(e.target);
        loadPrices();
        currentTab = 4;
    };

    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || error.description || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: announcement.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };

    var loadDetails = function () {

        var loadIndicSuccess = function (response) {
            var build,
                $accMethod,
                $securitiesUpdateBtn;

            $securityInfoContainer.innerHTML = '';
            build = tp('securityIndic', response, $fragment);
            $securityInfoContainer.appendChild($fragment);

            $securitiesUpdateBtn = build.btnSubmit;
            $accMethod = build.accMethod;

            var updateSecurity = function () {
                gt.removeClass($accMethod, 'error');

                if ($accMethod.value != '') {

                    btnUpdate.loading();

                    gt.request({
                        method: 'POST',
                        postData: {secId: selectedSecurityId, accountingMethod: $accMethod.value},
                        url: settings.controlsDescriptors.securities.updateSecurityUrl,
                        onSuccess: function () {
                            showAnnouncementMessage({text: 'Selected security has been updated', hideTimeout: 1000});
                            btnUpdate.enable();
                        },
                        onError: function () {
                            showErrorMessage({text: updatingSecurityErrorText});
                            btnUpdate.enable();
                        }
                    });
                }
                else {
                    gt.addClass($accMethod, 'error');
                    showErrorMessage({text: 'Please select the Accounting Method', hideTimeout: 1000})
                }
            };

            var btnUpdate = gt.button($securitiesUpdateBtn, {submitCallBack: updateSecurity});
        };

        $securityInfoContainer.innerHTML = '';
        var $fragment = global.document.createDocumentFragment();

        if (selectedSecurityId !== null) {

            tp('securityIndicLoading', $fragment);
            $securityInfoContainer.appendChild($fragment);

            if (settings.env === 'dev') {
                loadIndicSuccess(settings.dataModels.securityDetails);
            } else {
                gt.request({
                    method: 'POST',
                    postData: {secId: selectedSecurityId},
                    url: settings.controlsDescriptors.securities.getDetailsUrl,
                    onSuccess: loadIndicSuccess,
                    onError: function () {
                        showErrorMessage({text: loadingIndicErrorText});
                        $securityInfoContainer.innerHTML = '';
                    }
                });
            }
        }
        else {
            tp('securityInfoWrapperEmpty', {text: securityInfoWrapperEmptyText}, $fragment);
            $securityInfoContainer.appendChild($fragment);
        }
    };

    var loadPositions = function () {

        var $fragment = global.document.createDocumentFragment(),
            build,
            $asOfDate,
            $btnSubmit;

        $securityInfoContainer.innerHTML = '';

        if (selectedSecurityId !== null) {
            build = tp('securityPositions', {asOfDateValue: settings.controlsDescriptors.securities.prevBusinessDay}, $fragment);
            $securityInfoContainer.appendChild($fragment);
            $securityPositionContentContainer = build.securityPositionContentContainer;

            $asOfDate = build.asOfDate;

            $btnSubmit = build.btnSubmit;


            var sbmBtnClick = function () {
                //disableSbmBtn(this);

                btnSubmit.loading();

                if (settings.env === 'dev') {
                    loadPositionsSuccess(
                        {
                            errorCode: 0,
                            securityPositionColumns: settings.dataModels.securityPositionColumns,
                            securityPositions: settings.dataModels.securityPositions
                        }
                    );
                }
                else {
                    gt.request(
                        {
                            method: 'POST',
                            postData: {secId: selectedSecurityId, asOfDate: $asOfDate.value},
                            url: settings.controlsDescriptors.securities.loadPositionsUrl,
                            onSuccess: loadPositionsSuccess,
                            onError: loadPositionsError
                        });
                }
            };


            //gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
            var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick});

            gt.datePicker($asOfDate);

            //var disableSbmBtn = function (ctx) {
            //    gt.addClass(ctx.parentNode, 'disabled');
            //    gt.addClass(ctx.parentNode, 'loading');
            //    gt.removeEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
            //};
            //
            //var enableSbmBtn = function () {
            //    gt.removeClass($btnSubmit.parentNode, 'disabled');
            //    gt.removeClass($btnSubmit.parentNode, 'loading');
            //    gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
            //};

            var loadPositionsSuccess = function (response) {

                btnSubmit.enable();

                if (response.errorCode === 0) {
                    var data = response.securityPositions;
                    var positionColumns = response.securityPositionColumns;

                    var positions = [],
                        columns = [];

                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var pos = {};
                            for (var obj in data[i]) {
                                pos[data[i][obj].Key] = data[i][obj].Value;
                            }
                            positions.push(pos)
                        }
                        columns = gt.getSlickGridColumns(positions[0], positionColumns);
                    }

                    //rs.slickGrid("#securityPositionsGrid", columns, data);
                    rs.slickGrid("#securityPositionsGrid", columns, positions);
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }


                //btnSubmit.enable();
                //if (response.errorCode === 0) {
                //    var data = response.securityPositions,
                //        columns = response.securityPositionColumns;
                //
                //    rs.slickGrid("#securityPositionsGrid", columns, data);
                //} else {
                //    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                //}

            };

            var loadPositionsError = function (error) {
                showErrorMessage({text: error || loadingPositionsErrorText});
                //enableSbmBtn();
                btnSubmit.enable();
            };

            sbmBtnClick.call();
        }
        else {
            tp('securityInfoWrapperEmpty', {text: securityInfoWrapperEmptyText}, $fragment);
            $securityInfoContainer.appendChild($fragment);
        }


    };

    var loadTrades = function () {
        var $fragment = global.document.createDocumentFragment(),
            $strategy,
            build;
        $securityInfoContainer.innerHTML = '';
        if (selectedSecurityId !== null) {

            build = tp('securityTrades', {isRSSupportADGroupMember: settings.isRSSupportADGroupMember}, $fragment);
            $strategy = build.strategy;
            $securityInfoContainer.appendChild($fragment);

            $securityTradesContentContainer = build.securityTradesContentContainer;

            var updateStrategySuccess = function (response) {
                if (response.errorCode == 0) {
                    showAnnouncementMessage({text: response.message});
                } else {
                    showErrorMessage({text: response.errorText});
                }
                btnUpdateSubmit.enable();
            };

            var updateStrategyError = function (error) {
                showErrorMessage({text: error || updatingPricesErrorText});
                btnUpdateSubmit.enable();
            };

            var loadTradesSuccess = function (response) {
                var valueFormatter = function (row, cell, value, columnDef, dataContext) {
                    return '<div class="trades-checkbox"><input class="riskSimTradeItemCheckbox" type="checkbox" data-value-TradeId="' + value.TradeId + '"></div>';
                };

                if (response.errorCode === 0) {
                    var data = response.trades,
                        tradeColumns = response.tradeColumns,
                        trades = [],
                        columns = [];
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var trade = {};
                            for (var obj in data[i]) {
                                trade[data[i][obj].Key] = data[i][obj].Value;
                            }
                            trade['tradeCheckbox'] = {
                                TradeId: trade['EvID']
                            };
                            trades.push(trade)
                        }
                        //columns = gt.getSlickGridColumns(trades[0], tradeColumns);
                        columns = gt.getSlickGridColumns(trades[0], tradeColumns, 'tradeCheckbox');
                        columns.unshift({
                            id: -1,
                            name: '',
                            width: 10,
                            field: 'tradeCheckbox',
                            formatter: valueFormatter
                        });
                    }

                    rs.slickGrid("#securityTradesGrid", columns, trades, 'tradeCheckbox');
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }
            };

            var loadTradesError = function (error) {
                showErrorMessage({text: error || loadingTradesErrorText});
            };


            if (settings.env === 'dev') {
                loadTradesSuccess(
                    {
                        errorCode: 0,
                        tradeColumns: settings.dataModels.tradeColumns,
                        trades: settings.dataModels.trades
                    }
                );
            }
            else {
                gt.request(
                    {
                        method: 'POST',
                        postData: {secId: selectedSecurityId},
                        url: settings.controlsDescriptors.securities.loadTradesUrl,
                        onSuccess: loadTradesSuccess,
                        onError: loadTradesError
                    });
            }

            var collectSelectedTrades = function () {
                var result = [],
                    checkboxes = gt.$c('riskSimTradeItemCheckbox');
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        result.push(
                            {
                                TradeId: checkboxes[i].getAttribute("data-value-TradeId")
                            }
                        );
                    }
                }
                return result;
            };

            var sbmBtnUpdateClick = function () {
                var selectedTrades = collectSelectedTrades();
                if (selectedTrades.length > 0) {
                    //disableUpdateSbmBtn(this);

                    btnUpdateSubmit.loading();

                    $.ajax({
                        url: settings.controlsDescriptors.securities.updateStrategyUrl,
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                selectedTrades: selectedTrades,
                                strategyId: $strategy.value,
                                secId: selectedSecurityId
                            }
                        ),
                        contentType: 'application/json',
                        success: updateStrategySuccess,
                        error: updateStrategyError
                    });
                }
                else {
                    showErrorMessage({text: 'Please select trades to update'})
                }
            };


            if (settings.isRSSupportADGroupMember === true) {

                $btnUpdateSubmit = build.btnUpdateSubmit;
                var btnUpdateSubmit = gt.button($btnUpdateSubmit, {
                    submitCallBack: sbmBtnUpdateClick//,
                    //isDisabled: true
                });


            }

        } else {
            tp('securityInfoWrapperEmpty', {text: securityInfoWrapperEmptyText}, $fragment);
            $securityInfoContainer.appendChild($fragment);
        }
    };

    var loadPrices = function () {
        var $fragment = global.document.createDocumentFragment(),
            build;
        $securityInfoContainer.innerHTML = '';
        if (selectedSecurityId !== null) {
            build = tp('securityPrices', {
                rsPriceDateValue: settings.controlsDescriptors.securities.prevBusinessDay,
                vpmPriceDateValue: ''
            }, $fragment);
            $securityInfoContainer.appendChild($fragment);
            $securityPricesContentContainer = build.securityPricesContentContainer;

            $rsPriceDate = build.rsPriceDate;
            $vpmPriceDate = build.vpmPriceDate;

            $btnSearchSubmit = build.btnSearchSubmit;
            $btnUpdateSubmit = build.btnUpdateSubmit;

            gt.datePicker($rsPriceDate);
            gt.datePicker($vpmPriceDate);


            var sbmBtnSearchClick = function () {
                btnSearchSubmit.loading();
                if (settings.env === 'dev') {
                    loadPricesSuccess(
                        {
                            errorCode: 0,
                            prices: settings.dataModels.securityPrices,
                            priceColumns: settings.dataModels.priceColumns
                        }
                    );
                }
                else {
                    gt.request(
                        {
                            method: 'POST',
                            postData: {
                                secId: selectedSecurityId,
                                rsPriceDate: $rsPriceDate.value,
                                vpmPriceDate: $vpmPriceDate.value
                            },
                            url: settings.controlsDescriptors.securities.loadPricesUrl,
                            onSuccess: loadPricesSuccess,
                            onError: loadPricesError
                        });
                }
            };
            var collectSelectedPrices = function () {
                var result = [],
                    checkboxes = gt.$c('riskSimPriceItemCheckbox');
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        result.push(
                            {
                                SecId: checkboxes[i].getAttribute("data-value-SecId"),
                                PortfolioId: checkboxes[i].getAttribute("data-value-PortfolioId"),
                                VpmPriceDate: checkboxes[i].getAttribute("data-value-VpmPriceDate"),
                                EffectivePrice: checkboxes[i].getAttribute("data-value-EffectivePrice"),
                                RsPriceDate: checkboxes[i].getAttribute("data-value-RsPriceDate")
                            }
                        );
                    }
                }
                return result;
            };
            var sbmBtnUpdateClick = function () {
                var selectedPrices = collectSelectedPrices();
                if (selectedPrices.length > 0) {
                    //disableUpdateSbmBtn(this);

                    btnUpdateSubmit.loading();

                    $.ajax({
                        url: settings.controlsDescriptors.securities.updatePricesUrl,
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                secId: selectedSecurityId,
                                rsPriceDate: $rsPriceDate.value,
                                vpmPriceDate: $vpmPriceDate.value,
                                selectedPrices: selectedPrices
                            }
                        ),
                        contentType: 'application/json',
                        success: updatePricesSuccess,
                        error: updatePricesError
                    });
                }
                else {
                    showErrorMessage({text: 'Please select prices to update'})
                }
            };

            var updatePricesSuccess = function (response) {
                if (response.errorCode == 0) {
                    showAnnouncementMessage({text: response.message});
                } else {
                    showErrorMessage({text: response.errorText});
                }
                //enableUpdateSbmBtn();
                btnUpdateSubmit.enable();
            };

            var updatePricesError = function (error) {
                showErrorMessage({text: error || updatingPricesErrorText});
                //enableUpdateSbmBtn();
                btnUpdateSubmit.enable();
            };

            var loadPricesSuccess = function (response) {
                var valueFormatter = function (row, cell, value, columnDef, dataContext) {
                    return '<div class="prices-checkbox"><input class="riskSimPriceItemCheckbox" type="checkbox" ' +
                        'data-value-SecId="' + value.SecId + '" ' +
                        'data-value-PortfolioId="' + value.PortfolioId + '" ' +
                        'data-value-VpmPriceDate="' + value.VpmPriceDate + '" ' +
                        'data-value-EffectivePrice="' + value.EffectivePrice + '" ' +
                        'data-value-RsPriceDate="' + value.RsPriceDate + '"></div>';
                };

                if (response.errorCode === 0) {
                    var data = response.prices,
                        priceColumns = response.priceColumns,
                        prices = [],
                        columns = [];
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var price = {};
                            for (var obj in data[i]) {
                                price[data[i][obj].Key] = data[i][obj].Value;
                            }
                            price['priceCheckbox'] = {
                                SecId: price['secid'],
                                PortfolioId: price['PortfolioID'],
                                VpmPriceDate: price['VPMPriceDate'],
                                EffectivePrice: price['EffectivePrice'],
                                RsPriceDate: price['RSPriceDate']
                            };
                            prices.push(price)
                        }
                        columns = gt.getSlickGridColumns(prices[0], priceColumns, 'priceCheckbox');

                        columns.unshift({
                            id: -1,
                            name: '',
                            width: 10,
                            field: 'priceCheckbox',
                            formatter: valueFormatter
                        });
                    }


                    rs.slickGrid("#securityPricesGrid", columns, prices, 'priceCheckbox');
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }

                btnSearchSubmit.enable();
            };

            var loadPricesError = function (error) {
                showErrorMessage({text: error || loadingPricesErrorText});
                btnSearchSubmit.enable();
            };

            var btnSearchSubmit = gt.button($btnSearchSubmit, {submitCallBack: sbmBtnSearchClick});
            var btnUpdateSubmit = gt.button($btnUpdateSubmit, {
                submitCallBack: sbmBtnUpdateClick//,
                //isDisabled: true
            });

            sbmBtnSearchClick.call();
        }
        else {
            tp('securityInfoWrapperEmpty', {text: securityInfoWrapperEmptyText}, $fragment);
            $securityInfoContainer.appendChild($fragment);
        }

    };

    var getValues = function () {
        return {
            SecurityId: ($secId.value + '').trim(),
            SecurityIdType: ($secIdType.value + '').trim()
        }
    };

    var onSelectSecurity = function (e) {


        var $row = gt.getParentBy(e.target, 'tagName', 'TR', true);
        var secId = $row.getAttribute('data-value');
        var $rows = gt.$tn('tr');
        for (var i = 0; i < $rows.length; i++) {
            gt.removeClass($rows[i], 'selected');
        }

        gt.addClass($row, 'selected');

        gt.$('info').innerHTML = 'Selected securityId: <span>' + secId + '</span>';

        selectedSecurityId = secId;

        gt.removeClass($securityInfoWrapper, 'hidden');

        if (!currentTab) {
            setCurrentMenuItemActive(tabs.$indicTab.n);
            loadDetails();
            currentTab = 1;
        }
        else {
            switch (currentTab) {
                case 1:
                    loadDetails();
                    break;
                case 2:
                    loadPositions();
                    break;
                case 3:
                    loadTrades();
                    break;
                case 4:
                    loadPrices();
                    break;
            }
        }
    };

    var getSecuritiesSuccess = function (response) {
        var columns = ['SecId', 'VpmId', 'VpmSyCode'];

        $securityResultTable.innerHTML = '';

        $fragment = global.document.createDocumentFragment();
        tp('securityListHead', columns, $fragment);

        if (response.Securities.length > 0) {
            gt.each(response.Securities, function (item, i) {
                item.odd = i % 2 == 0;
                securityListItem = tp('securityListItem', item, $fragment);
                gt.addEvent(securityListItem.r, eventOnPointerEnd, onSelectSecurity);
            });
        }
        selectedSecurityId = null;
        gt.$('info').innerHTML = '';
        $securityResultTable.appendChild($fragment);
        loadTrades();
        loadPositions();
        loadPrices();
        loadDetails();

    };

    var getSecuritiesError = function (error) {
        showErrorMessage({text: error || loadingSecuritiesErrorText});
    };

    var onChangeRequestQuery = function () {
        var values = getValues();
        if (settings.env === 'dev') {
            getSecuritiesSuccess({Securities: settings.dataModels.securities});
        } else {
            gt.request(
                {
                    method: 'POST',
                    postData: {secId: values.SecurityId, secIdType: values.SecurityIdType},
                    url: settings.controlsDescriptors.securities.searchUrl,
                    onSuccess: getSecuritiesSuccess,
                    onError: getSecuritiesError
                });
        }
    };

    gt.addEvent($secId, 'keyup', onChangeRequestQuery);
    gt.addEvent($secIdType, 'change', onChangeRequestQuery);

    initTabs();
};