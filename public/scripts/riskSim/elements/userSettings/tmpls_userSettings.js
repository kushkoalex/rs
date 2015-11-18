(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;


    tmpls.userSettings = function () {
        return {
            c: 'user-settings-content-wrapper'
        };
    };

    tmpls.gridSettingsWidget = function(){
        return {
            c: 'grid-settings-widget', C: [
                {
                    c: 'header', C: {
                    c: 'title noselect', n:'title', t: 'Positions'
                }
                },
                {
                    c: 'content', n:'content'
                }
            ]
        }
    };

    tmpls.gridSettingsWidgetColumnHeader = function(){
        return{c:'item',C:
            [
                {c:'item-control caption column-name-label',n:'columnName'},
                {c:'item-control caption column-name-input-width',t:'Width'},
                {c:'item-control caption column-name-input-dataFormat',t:'Data format'},
                {c:'item-control caption column-name-input-displayOrder',t:'Display order'}
            ]}
    };

    tmpls.gridSettingsWidgetColumn = function(column){
        return{c:'item',C:
            [
                {c:'item-control column-name-label',n:'columnName'},
                {c:'item-control column-name-input-width',C:tmpls.input({name:'',value:column.minWidth,n:'columnNameInputWidth'})},
                {c:'item-control column-name-input-dataFormat',C:tmpls.input({name:'',value:column.dataFormat,n:'columnNameInputDataFormat'})},
                {c:'item-control column-name-input-displayOrder',C:tmpls.input({name:'',value:column.displayOrder,n:'columnNameInputDataDisplayOrder'})}
            ]}
    };



}(RS));
