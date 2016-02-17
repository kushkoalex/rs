(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.supportDashboard = function (commands) {
        var items = [],
            i;

        for (i = 0; i < commands.length; i++) {
            items.push({text: commands[i].title, value: commands[i].id});
        }

        return {
            c: 'support-dashboard-container', C: [
                {
                    c: 'message-wrapper', n: 'messagesWrapper'
                },
                {
                    c: 'input-group inline command', C: [
                    {
                        c: 'form-control',
                        C: tmpls.select({n: 'sCommand', items: items, title: 'Action Type:'})
                    },
                    {
                        c: 'form-control',
                        C: tmpls.loadingButton({text: 'Execute', n: 'btnSubmit'})
                    }
                ]
                },
                {
                    c: 'form-control',
                    C: {n: 'commandDescription', t: ''}
                },
                {
                    c: 'input-group command-parameters', C: {n: 'commandParams'}

                }
            ]
        };
    };

    tmpls.commandParameter = function (data) {
        var items = [],
            values = data.values,
            i;

        if (values.length === 0) {
            var inputOptions = {n: 'sCommandParameter', title: data.param.description+':'};
            if (data.param.defaultValue) {
                inputOptions.placeholder = data.param.defaultValue;
            }
            return {
                c: 'form-control',a:{'data-type':rs.settings.controlsDescriptors.supportDashboard.commandParamTypeEntered},
                //C: tmpls.input(inputOptions)
				//C: tmpls.multipleInput({n: 'evIds', title: 'EvIds'})
				C:tmpls.multipleInput(inputOptions)
            }
        }

        for (i = 0; i < values.length; i++) {
            items.push({text: values[i].value, value: values[i].id});
        }
        return {
            c: 'form-control', a:{'data-type':rs.settings.controlsDescriptors.supportDashboard.commandParamTypeSelected},
            C: tmpls.select({n: 'sCommandParameter', items: items, title: data.param.description+':'})
        }
    }

}(RS));