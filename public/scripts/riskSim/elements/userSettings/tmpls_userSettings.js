(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;


    tmpls.userSettings = function () {
        return {
            c: 'user-settings-content-wrapper', C: [{
                c: 'message-wrapper', n: 'messagesWrapper'
            },
                {c: 'user-settings-content', n: 'userSettingsContent'},
                {c: 'tools-panel', C: tmpls.loadingButton({text: 'Save', n: 'saveBtn'})}
            ]
        };
    };

    tmpls.gridSettingsWidget = function () {
        return {
            c: 'grid-settings-widget', C: [
                {
                    c: 'header', C: {
                    c: 'title noselect', n: 'title', t: 'Positions'
                }
                },
                {
                    c: 'content', n: 'content'
                }
            ]
        }
    };

    tmpls.gridSettingsWidgetColumnHeader = function () {
        return {
            c: 'item', C: [
                {c: 'item-control caption column-name-checkbox'},
                {c: 'item-control caption column-name-label'},
                {c: 'item-control caption column-name-input-width', t: 'Width'},
                {c: 'item-control caption column-name-input-dataFormat', t: 'Data format'},
                {c: 'item-control caption column-name-input-displayOrder', t: 'Display order'}
            ]
        }
    };

    tmpls.gridSettingsWidgetColumn = function (column) {
        return {
            c: 'item' + (column.active === false ? ' disabled' : ''), C: [
                {c: 'item-control column-name-checkbox', C: tmpls.checkbox({checked:column.active, n:'checkbox'})},
                {c: 'item-control column-name-label', t: column.columnName},
                {
                    c: 'item-control column-name-input-width',
                    C: tmpls.input({name: '', value: column.minWidth, n: 'columnNameInputWidth', disabled:column.active === false })
                },
                {
                    c: 'item-control column-name-input-dataFormat',
                    C: tmpls.input({name: '', value: column.dataFormat, n: 'columnNameInputDataFormat', disabled:column.active === false})
                },
                {
                    c: 'item-control column-name-input-displayOrder',
                    C: tmpls.input({name: '', value: column.displayOrder, n: 'columnNameInputDataDisplayOrder', disabled:column.active === false})
                }
            ]
        }
    };


}(RS));
