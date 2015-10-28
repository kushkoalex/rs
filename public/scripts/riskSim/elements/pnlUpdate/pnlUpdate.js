RS.pnlUpdate = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        build = tp('pnlUpdate', $parent),
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = build.messagesWrapper,
        $btnSubmit = build.btnSubmit,
        $runDate = build.runDate,
        $portfolios = build.portfolios,
        $securityIds = build.securityIds,
        refreshIntervalId,
        statusChecked = false,
        u;


    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var rgRunOnSuccess = function (response) {
        refreshIntervalId = setInterval(getStatus, 2000);
    };

    var rgRunOnError = function () {
        showErrorMessage({text: 'error'});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }
        btnSubmit.disable();
        var data = {
            portfolios: portfolios.getValues(),
            securityIds: securityIds.getValues(),
            runDate: $runDate.value
        };

        $.ajax({
            url: settings.controlsDescriptors.securities.reportGenRunUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: rgRunOnSuccess,
            error: rgRunOnError
        });
    };

    var validateFields = function () {
        var isValid = true;

        if (portfolios.getValues().length === 0) {
            gt.addClass($portfolios, 'error');
            isValid = false
        }
        if (securityIds.getValues().length === 0) {
            gt.addClass($securityIds, 'error');
            isValid = false
        }

        if ($runDate.value === '') {
            gt.addClass($runDate, 'error');
            isValid = false
        }

        if (!isValid) {
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };


    //gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);

    var getStatus = function () {

        var url = rs.settings.controlsDescriptors.securities.getReportGenStatusUrl;

        $.get(url, function (response) {
            var status = JSON.parse(response);
            console.log(status);
            var statusDetails = document.getElementById('statusDetails');

            if (!status.errorCode) {
                statusDetails.innerHTML = '';

                if (status.completed === 1) {
                    if (refreshIntervalId) {
                        clearInterval(refreshIntervalId);
                        btnSubmit.enable();
                        //enableSbmBtn();
                    }
                }
                else {
                    //disableSbmBtn($btnSubmit);
                    btnSubmit.loading();
                }

                if (status.completed === 1 && !statusChecked) {
                    statusDetails.innerHTML += 'There are no running processes'
                } else {
                    for (var i = 0; i < status.resultItems.length; i++) {
                        statusDetails.innerHTML += status.resultItems[i].process + ' | ' + status.resultItems[i].details + ' | ' + status.resultItems[i].progress + '<br>';
                    }
                }

                statusChecked = true;

            } else {
                statusDetails.innerHTML = status.errorMessage;
                clearInterval(refreshIntervalId);
                //enableSbmBtn();
                btnSubmit.enable();
            }
        }).fail(function (error) {
            clearInterval(refreshIntervalId);
            //enableSbmBtn();
            btnSubmit.enable();
            console.log(error);
        }).always(function (data) {
            //alert("finished");
        });
    };

    gt.datePicker($runDate);
    var portfolios = gt.multipleInput($portfolios);
    var securityIds = gt.multipleInput($securityIds);
    var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick});

    //getStatus();
    refreshIntervalId = setInterval(getStatus, 3000);
};