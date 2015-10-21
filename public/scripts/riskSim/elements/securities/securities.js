RS.securities = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        doc = global.document,
        data = settings.dataModels.securities,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        //securities = settings.dataModels.securities,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        build = tp('securities', $parent),
        $popupMessagesWrapper = build.messagesWrapper,
        loadingPositionsErrorText = 'Error loading security positions',
        loadingTradesErrorText = 'Error loading security trades',
        loadingPricesErrorText = 'Error loading security prices',
        updatingPricesErrorText = 'Error updating security prices',
        loadingIndicErrorText = 'Error loading security indic',
        loadingSecuritiesErrorText = 'Error loading securities',
        securityInfoWrapperEmptyText ='Please select the security from the list',
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
        $indicTab,
        $positionsTab,
        $tradesTab,
        $pricesTab,
        currentTab,
        u;


    $secId = build.secId;
    $secIdType = build.secIdType;
    $securityResultTable = build.securityResultTable;
    $securityInfoWrapper = build.securityInfoWrapper;
    $securityInfoContainer = build.securityInfoContainer;


    $indicTab = build.indicTab;
    $positionsTab = build.positionsTab;
    $tradesTab = build.tradesTab;
    $pricesTab = build.pricesTab;


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
            hideTimeout: securitiesErrorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: securitiesErrorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };

    var loadDetails = function () {

        $securityInfoContainer.innerHTML = '';
        var $fragment = global.document.createDocumentFragment();


        if (selectedSecurityId !== null) {
            gt.request({
                method: 'POST',
                postData: {secId: selectedSecurityId},
                url: settings.controlsDescriptors.securities.getDetailsUrl,
                onSuccess: function (data) {
                    tp('securityIndic', data, $fragment);
                    $securityInfoContainer.appendChild($fragment)
                },
                onError: function () {
                    showErrorMessage({text:loadingIndicErrorText});
                }
            });
        }
        else {
            tp('securityInfoWrapperEmpty',{text:securityInfoWrapperEmptyText},$fragment);
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
                disableSbmBtn(this);
                gt.request(
                    {
                        method: 'POST',
                        postData: {secId: selectedSecurityId, asOfDate: $asOfDate.value},
                        url: settings.controlsDescriptors.securities.loadPositionsUrl,
                        onSuccess: loadPositionsSuccess,
                        onError: loadPositionsError
                    });
            };


            gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);

            gt.datePicker($asOfDate);

            var disableSbmBtn = function (ctx) {
                gt.addClass(ctx.parentNode, 'disabled');
                gt.addClass(ctx.parentNode, 'loading');
                gt.removeEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
            };

            var enableSbmBtn = function () {
                gt.removeClass($btnSubmit.parentNode, 'disabled');
                gt.removeClass($btnSubmit.parentNode, 'loading');
                gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
            };

            var loadPositionsSuccess = function (response) {
                if (response.errorCode === 0) {
                    var data = response.securityPositions,
                        columns = response.securityPositionColumns;

                    rs.slickGrid("#securityPositionsGrid", columns, data);
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }
                enableSbmBtn();
            };

            var loadPositionsError = function (error) {
                showErrorMessage({text: error || loadingPositionsErrorText});
                enableSbmBtn();
            };

            sbmBtnClick.call($btnSubmit);
        }
        else {
            tp('securityInfoWrapperEmpty',{text:securityInfoWrapperEmptyText},$fragment);
            $securityInfoContainer.appendChild($fragment);
        }


    };

    var loadTrades = function () {
        var $fragment = global.document.createDocumentFragment(),
            build;
        $securityInfoContainer.innerHTML = '';
        if (selectedSecurityId !== null) {
            build = tp('securityTrades', $fragment);
            $securityInfoContainer.appendChild($fragment);

            $securityTradesContentContainer = build.securityTradesContentContainer;

            var loadTradesSuccess = function (response) {
                if (response.errorCode === 0) {
                    var data = response.trades,
                        columns = response.tradeColumns;
                    rs.slickGrid("#securityTradesGrid", columns, data);
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }
            };

            var loadTradesError = function (error) {
                showErrorMessage({text: error || loadingTradesErrorText});
            };

            gt.request(
                {
                    method: 'POST',
                    postData: {secId: selectedSecurityId},
                    url: settings.controlsDescriptors.securities.loadTradesUrl,
                    onSuccess: loadTradesSuccess,
                    onError: loadTradesError
                });

        } else {
            tp('securityInfoWrapperEmpty',{text:securityInfoWrapperEmptyText},$fragment);
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
                disableSearchSbmBtn(this);
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
            };


            var collectSelectedPrices = function () {
                var result = [],
                    checkboxes = gt.$c('riskSimPriceItemCheckbox');
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        result.push(checkboxes[i].getAttribute("name"));
                    }
                }
                return result;
            };

            var sbmBtnUpdateClick = function () {
                var selectedPrices = collectSelectedPrices();
                if (selectedPrices.length > 0) {
                    disableUpdateSbmBtn(this);
                    gt.request(
                        {
                            method: 'POST',
                            postData: {
                                secId: selectedSecurityId,
                                rsPriceDate: $rsPriceDate.value,
                                vpmPriceDate: $vpmPriceDate.value,
                                selectedPrices: selectedPrices.join('###')
                            },
                            url: settings.controlsDescriptors.securities.updatePricesUrl,
                            onSuccess: updatePricesSuccess,
                            onError: updatePricesError
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
                enableUpdateSbmBtn();
            };

            var updatePricesError = function (error) {
                showErrorMessage({text: error || updatingPricesErrorText});
                enableUpdateSbmBtn();
            };


            var loadPricesSuccess = function (response) {

                if (response.errorCode === 0) {

                    //var prices = settings.dataModels.securityPrices,
                    var prices = response.prices,
                        i,
                        j,
                        $fragment = global.document.createDocumentFragment(),
                        $fragmentPrice = global.document.createDocumentFragment(),
                        $securityPricesTableContent,
                        $cbSelectAll,
                        build,
                        $row,
                        items = [],
                        buildItem;

                    $securityPricesContentContainer.innerHTML = '';


                    var checkItem = function (cb) {
                        var row = cb.parentNode.parentNode;
                        if (cb.checked) {
                            gt.addClass(row, 'checked')
                        } else {
                            gt.removeClass(row, 'checked')
                        }
                    };

                    if (prices.length > 0) {
                        build = tp('securityPricesTable', $fragment);
                        $securityPricesTableContent = build.securityPricesTableContent;
                        $cbSelectAll = build.cbSelectAll;

                        for (i = 0; i < prices.length; i++) {
                            if (i % 2 == 0) {
                                prices[i].odd = true;
                            }
                            buildItem = tp('securityPricesTableItem', prices[i], $fragmentPrice);
                            $securityPricesTableContent.appendChild($fragmentPrice);
                            $row = buildItem.row;
                            items.push(buildItem.cb);
                            gt.addEvent(buildItem.cb, eventOnPointerEnd, function () {
                                checkItem(this)
                            });
                        }

                        gt.addEvent($cbSelectAll, eventOnPointerEnd, function () {

                            console.log(items);
                            for (j = 0; j < items.length; j++) {
                                items[j].checked = !!$cbSelectAll.checked;
                                checkItem(items[j]);
                            }
                        });

                        $securityPricesContentContainer.appendChild($fragment);
                        gt.removeClass($btnUpdateSubmit, 'disabled');
                        gt.addEvent($btnUpdateSubmit, eventOnPointerEnd, sbmBtnUpdateClick);
                    }
                } else {
                    showErrorMessage({text: response.errorText || loadingPositionsErrorText})
                }
                enableSearchSbmBtn();

            };

            var loadPricesError = function (error) {

                setTimeout(function () {
                    showErrorMessage({text: error || loadingPricesErrorText});
                    enableSearchSbmBtn();
                }, 2000);


            };

            var disableSearchSbmBtn = function (ctx) {
                gt.addClass(ctx.parentNode, 'disabled');
                gt.addClass(ctx.parentNode, 'loading');
                gt.removeEvent($btnSearchSubmit, eventOnPointerEnd, sbmBtnSearchClick);
            };

            var enableSearchSbmBtn = function () {
                gt.removeClass($btnSearchSubmit.parentNode, 'disabled');
                gt.removeClass($btnSearchSubmit.parentNode, 'loading');
                gt.addEvent($btnSearchSubmit, eventOnPointerEnd, sbmBtnSearchClick);
            };

            var disableUpdateSbmBtn = function (ctx) {
                gt.addClass(ctx.parentNode, 'disabled');
                gt.addClass(ctx.parentNode, 'loading');
                gt.removeEvent($btnUpdateSubmit, eventOnPointerEnd, sbmBtnUpdateClick);
            };

            var enableUpdateSbmBtn = function () {
                gt.removeClass($btnUpdateSubmit.parentNode, 'disabled');
                gt.removeClass($btnUpdateSubmit.parentNode, 'loading');
                gt.addEvent($btnUpdateSubmit, eventOnPointerEnd, sbmBtnUpdateClick);
            };

            gt.addEvent($btnSearchSubmit, eventOnPointerEnd, sbmBtnSearchClick);

            gt.addClass($btnUpdateSubmit, 'disabled');

            sbmBtnSearchClick.call($btnSearchSubmit);

        }
        else {
            tp('securityInfoWrapperEmpty',{text:securityInfoWrapperEmptyText},$fragment);
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
                setCurrentMenuItemActive($indicTab);
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

    var getSecuritiesSuccess = function (data) {
        var columns = ['SecId', 'VpmId', 'VpmSyCode'];

        $securityResultTable.innerHTML = '';

        $fragment = global.document.createDocumentFragment();
        tp('securityListHead', columns, $fragment);

        if (data.Securities.length > 0) {
            gt.each(data.Securities, function (item, i) {
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
        gt.request(
            {
                method: 'POST',
                postData: {secId: values.SecurityId, secIdType: values.SecurityIdType},
                url: settings.controlsDescriptors.securities.searchUrl,
                onSuccess: getSecuritiesSuccess,
                onError: getSecuritiesError
            });
    };

    gt.addEvent($secId, 'keyup', onChangeRequestQuery);
    gt.addEvent($secIdType, 'change', onChangeRequestQuery);

    gt.addEvent($indicTab, eventOnPointerEnd, indicTabClick);
    gt.addEvent($positionsTab, eventOnPointerEnd, positionsTabClick);
    gt.addEvent($tradesTab, eventOnPointerEnd, tradesTabClick);
    gt.addEvent($pricesTab, eventOnPointerEnd, pricesTabClick);
};