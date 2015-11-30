RS.opsDashboard = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        build = tp('opsDashboard', $parent),
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = build.messagesWrapper,
        loadingVpmFxRatesErrorText = 'Error loading security trades',
        $btnSubmit = build.btnSubmit,
        u;


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


    var sendEmailOnSuccess = function (response) {
        if (response.errorCode === 1) {
            showErrorMessage({text: response.errorText});
        } else {
            showAnnouncementMessage({text: response.message});
        }
        btnSubmit.enable();
    };

    var sendEmailOnError = function () {
        showErrorMessage({text: 'an error occurred while sending request'});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {

        btnSubmit.loading();

        $.ajax({
            url: settings.controlsDescriptors.securities.opsDashboardSendEmainUrl,
            type: 'POST',
            //data: JSON.stringify(data),
            contentType: 'application/json',
            success: sendEmailOnSuccess,
            error: sendEmailOnError
        });
    };

    var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick});


    var loadVpmFxRatesSuccess = function(response){
        if (response.errorCode === 0) {
            var data = response.rates;
            var rateColumns = response.rateColumns;

            var rates = [],
                columns = [];

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var rate = {};
                    for (var obj in data[i]) {
                        rate[data[i][obj].Key] = data[i][obj].Value;
                    }
                    rates.push(rate)
                }
                columns = gt.getSlickGridColumns(rates[0], rateColumns);
            }

            //rs.slickGrid("#securityPositionsGrid", columns, data);
            rs.slickGrid("#vpmFxRatesGrid", columns, rates);
        } else {
            showErrorMessage({text: response.errorText || loadingVpmFxRatesErrorText})
        }
    };

    var loadVpmFxRatesError = function (error) {
        showErrorMessage({text: error || loadingVpmFxRatesErrorText});
    };

    if (settings.env === 'dev') {
        loadVpmFxRatesSuccess(
            {
                errorCode: 0,
                rateColumns: settings.dataModels.vpmFxRatesColumns,
                rates: settings.dataModels.vpmFxRates
            }
        );
    }
    else {
        $.ajax({
            url: settings.controlsDescriptors.securities.getVpmFxPricesUrl,
            type: 'POST',
            contentType: 'application/json',
            success: loadVpmFxRatesSuccess,
            error: loadVpmFxRatesError
        });
    }

};