RS.userSettings = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        build = tp('userSettings', $parent),
        $popupMessagesWrapper = build.messagesWrapper,
        $userSettingsContentWrapper = build.userSettingsContent,
        dataModel = settings.dataModels.userSettings,
        $saveBtn = build.saveBtn,
        gridBuild,
        columnBuild,
        $gridContent,
        $fragmentGrid,
        $checkboxes = [],
        $grids = [],
        gridItems,
        gridItem,
        $grid,
        u;


    var $fragment = global.document.createDocumentFragment();

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
            hideTimeout: announcement.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };

    var onCheckboxChecked = function (e) {

        var checkbox = e.target;

        var $item = checkbox.parentNode.parentNode;
        var children = gt.getChildren($item);
        var inputWidth = gt.getChildren(gt.getChildren(children[2])[0])[0];
        var inputDataFormat = gt.getChildren(gt.getChildren(children[3])[0])[0];
        var inputDisplayOrder = gt.getChildren(gt.getChildren(children[4])[0])[0];


        if (checkbox.checked) {
            gt.removeClass($item, 'disabled');
            inputWidth.removeAttribute('disabled');
            inputDataFormat.removeAttribute('disabled');
            inputDisplayOrder.removeAttribute('disabled');
        }
        else {
            gt.addClass($item, 'disabled');
            inputWidth.setAttribute('disabled', 'disabled');
            inputDataFormat.setAttribute('disabled', 'disabled');
            inputDisplayOrder.setAttribute('disabled', 'disabled');
        }
    };

    var saveOnSuccess = function (response) {
        if (response.errorCode === 1) {
            showErrorMessage({text: response.errorText});
        } else {
            showAnnouncementMessage({text: response.message});
        }
        btnSubmit.enable();
    };

    var saveOnError = function () {
        showErrorMessage({text: 'an error occurred while sending request'});
        btnSubmit.enable();
    };


    var formSubmit = function () {
        var data = collectFormValues();
        btnSubmit.loading();
        $.ajax({
            url: settings.controlsDescriptors.userSettings.saveUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: saveOnSuccess,
            error: saveOnError
        });
    };

    var collectFormValues = function () {
        var i,
            j,
            formData = [];

        for (i = 0; i < $grids.length; i++) {
            for (j = 0; j < $grids[i].items.length; j++) {
                if ($grids[i].items[j].$checkbox.checked) {
                    formData.push({
                        gridId: $grids[i].items[j].gridId,
                        name: $grids[i].items[j].name,
                        width: $grids[i].items[j].$width.value,
                        dataFormat: $grids[i].items[j].$dataFormat.value,
                        displayOrder: $grids[i].items[j].$displayOrder.value
                    });

                }
            }
        }
        return formData;
    };

    var saveBtnClick = function () {
        formSubmit();
    };

    var btnSubmit = gt.button($saveBtn, {submitCallBack: saveBtnClick});

    gt.each(dataModel.grids, function (grid) {

        gridBuild = tp('gridSettingsWidget', $fragment);
        gridBuild.title.innerText = grid.gridName;
        $gridContent = gridBuild.content;

        $fragmentGrid = global.document.createDocumentFragment();

        columnBuild = tp('gridSettingsWidgetColumnHeader', $fragmentGrid);

        $grid = [];

        gt.each(grid.gridColumns, function (gridColumn) {
            columnBuild = tp('gridSettingsWidgetColumn', gridColumn, $fragmentGrid);

            $grid.push({
                gridId: grid.gridId,
                $checkbox: columnBuild.checkbox,
                name: gridColumn.columnName,
                $width: columnBuild.columnNameInputWidth,
                $dataFormat: columnBuild.columnNameInputDataFormat,
                $displayOrder: columnBuild.columnNameInputDataDisplayOrder
            });
            gt.addEvent(columnBuild.checkbox, eventOnPointerEnd, onCheckboxChecked);
        });

        $grids.push({id: grid.gridId, name: grid.gridName, items: $grid});

        $gridContent.appendChild($fragmentGrid);

    });

    $userSettingsContentWrapper.appendChild($fragment);


};