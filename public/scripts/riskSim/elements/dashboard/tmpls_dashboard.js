(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.dashboard = function () {
        return{c:'dashboard-container',C:{c:'input-group inline',C:[
            {c:'form-control',C:tmpls.datePicker({title:'Date', name:'RsPriceDate',value:'',placeholder:'Enter date'})},
            {c:'form-control',C:tmpls.multipleInput({n:'evIds',title:'EvIds'})}
        ]} }
    };

}(RS));
