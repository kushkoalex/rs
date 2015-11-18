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

    tmpls.gridSettingsWidgetColumn = function(column){
        return{c:'item',C:
            [
                {c:'item-control column-name-label',n:'columnName'},
                {c:'item-control column-name-input',C:tmpls.input({name:'',value:column.id,n:'columnNameInputWidth'})},
                {c:'item-control column-name-input',C:tmpls.input({name:'',value:column.id,n:'columnNameInputDataFormat'})},
                {c:'item-control column-name-input',C:tmpls.input({name:'',value:column.id,n:'columnNameInputDataDisplayOrder'})}
            ]}
    };



}(RS));
