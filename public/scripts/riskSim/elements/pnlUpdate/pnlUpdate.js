RS.pnlUpdate = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        doc = global.document,
        loadIntoRiskSim,
        updateTrades,
        excludeTrades,
        build = tp('pnlUpdate', $parent),
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = build.messagesWrapper,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        $btnSubmit = build.btnSubmit,
        $runDate = build.runDate,
        $portfolios = build.portfolios,
        $securityIds = build.securityIds,
        refreshIntervalId,
        u;


    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || securitiesErrorMessageTimeout
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


    var rgRunOnSuccess = function (response) {
        //showAnnouncementMessage({text:response.message});
        refreshIntervalId = setInterval(getStatus, 2000);
    };

    var rgRunOnError = function () {
        showErrorMessage({text: 'error'});
        enableSbmBtn();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }
        disableSbmBtn(this);

        //gt.request(
        //    {
        //        method: 'POST',
        //        postData: {
        //            portfolios: portfolios.getValues(),
        //            securityIds: securityIds.getValues(),
        //            runDate: $runDate.value
        //        },
        //        url: settings.controlsDescriptors.securities.reportGenRunUrl,
        //        onSuccess: rgRunOnSuccess,
        //        onError: rgRunOnError
        //    });

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

    var portfolios = gt.multipleInput($portfolios);
    var securityIds = gt.multipleInput($securityIds);
    gt.datePicker($runDate);
    gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);


    var getStatus = function () {

        var url = rs.settings.controlsDescriptors.securities.getReportGenStatusUrl;

        $.get(url, function (response) {
            var status = JSON.parse(response);
            console.log(status);
            var statusDetails = document.getElementById('statusDetails');

            if (!status.errorCode) {
                statusDetails.innerHTML = '';
                for (var i = 0; i < status.resultItems.length; i++) {
                    statusDetails.innerHTML += status.resultItems[i].process + ' | ' + status.resultItems[i].details + ' | ' + status.resultItems[i].progress + '<br>';
                }

                if (status.completed === 1) {
                    if (refreshIntervalId) {
                        clearInterval(refreshIntervalId);
                        enableSbmBtn();
                    }
                }
                else {
                    disableSbmBtn($btnSubmit);
                }

            } else {
                statusDetails.innerHTML = status.errorMessage;
                clearInterval(refreshIntervalId);
                enableSbmBtn();
            }
        }).fail(function (error) {
            clearInterval(refreshIntervalId);
            enableSbmBtn();
            console.log(error);
        }).always(function (data) {
                //alert("finished");
            });
    };
    getStatus();
    refreshIntervalId = setInterval(getStatus, 3000);
};