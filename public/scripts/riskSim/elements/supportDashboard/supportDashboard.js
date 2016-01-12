RS.supportDashboard = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
    //eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        errorMessageTimeout = rs.settings.controlsDescriptors.errorMessageTimeout || 3000,
        notifications = rs.notifications,
        commands = rs.settings.dataModels.indicUpdateToolCommands,
        parameterValues = settings.dataModels.indicUpdateToolCommandsParamValues,
        build = tp('supportDashboard', commands, $parent),
        $commandParams = build.commandParams,
        $command = build.sCommand,
        $commandDescription = build.commandDescription,
        $popupMessagesWrapper = build.messagesWrapper,
        executeCommandErrorText = 'Error executing command',
        $btnSubmit = build.btnSubmit,
        $paramValues = [],
        refreshIntervalId,
        paramBuild,
        i,
        u;

    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || error.description || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || errorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: announcement.hideTimeout || errorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };

    var getItemById = function (items, id) {
        var i;
        for (i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return items[i];
            }
        }
        return null;
    };

    var getParameterValues = function (values, paramId) {
        var result = [];
        gt.each(values, function (item) {
            if (item.paramId === paramId) {
                result.push(item);
            }
        });
        return result;
    };

    var onCommandChange = function () {
        var $fragment = global.document.createDocumentFragment(),
            id = this.value,
            paramValues,
            i;

        $paramValues = [];

        var command = getItemById(commands, id);

        if (command !== null) {
            $commandDescription.innerText = command.description;

            $commandParams.innerHTML = '';
            gt.each(command.params, function (item) {
                paramValues = getParameterValues(parameterValues, item.id);
                paramBuild = tp('commandParameter', {param: item, values: paramValues}, $fragment);

                $paramValues.push({
                    id: item.id,
                    name: item.name,
                    $inp: paramBuild.sCommandParameter,
                    dataType: paramBuild.r.getAttribute('data-type')
                });
            });
            $commandParams.appendChild($fragment);
        }
    };

    gt.addEvent($command, 'change', onCommandChange);

    if ($command.length > 0) {
        onCommandChange.apply($command[0]);
    }

    var executeCommandSuccess = function (response) {
        if (response.errorCode === 0) {
            showAnnouncementMessage({text: response.message});
            refreshIntervalId = setInterval(getStatus, 2000);
        } else {
            showErrorMessage({text: response.errorText || executeCommandErrorText});
            btnSubmit.enable();
        }
        //btnSubmit.enable();
    };

    var getStatus = function () {
        $.ajax({
            url: rs.settings.controlsDescriptors.supportDashboard.indicUpdateToolExecuteCommandStatusUrl,
            type: 'POST',
            contentType: 'application/json',
            success: function (status) {
                if (!status.errorCode) {
                    if (status.statusCode === 0) {
                        clearInterval(refreshIntervalId);
                        btnSubmit.enable();
                    }
                    else {
                        showAnnouncementMessage({text: status.statusText})
                    }
                }
            },
            error: function (error) {
                clearInterval(refreshIntervalId);
                btnSubmit.enable();
                showErrorMessage({text: error || executeCommandErrorText});
            }
        });
    };

    var executeCommandError = function (error) {
        showErrorMessage({text: error || executeCommandErrorText});
        btnSubmit.enable();
    };

    var collectFormData = function () {
        var params = [];
        gt.each($paramValues, function (item) {
            params.push({id: item.id, name: item.name, value: item.$inp.value, populateMethod: item.dataType});
        });

        return {
            commandId: +$command.value,
            commandParams: params
        }
    };

    var sbmBtnClick = function () {
        btnSubmit.loading();
        if (settings.env === 'dev') {
            setTimeout(function () {
                collectFormData();
                executeCommandSuccess(
                    {
                        errorCode: 0,
                        message: 'success'
                    }
                );
            }, 500);
        } else {
            $.ajax({
                url: settings.controlsDescriptors.supportDashboard.indicUpdateToolExecuteCommandUrl,
                type: 'POST',
                data: JSON.stringify(collectFormData()),
                contentType: 'application/json',
                success: executeCommandSuccess,
                error: executeCommandError
            });
        }
    };
    var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick});
    refreshIntervalId = setInterval(getStatus, 3000);
};