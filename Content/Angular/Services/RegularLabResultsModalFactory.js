/// <reference path="../../LabResults/ModalsContents/KFTContent.html" />


app.factory('showResultModal', function ($uibModal) {

    function formatDate(date) {
        return new Date(parseInt(date.replace('/Date(', ''))).toISOString().slice(0, 10);;
    }

    function createTemplate(mcdtObject, type) {
        var header = function () {
            var divHeader = document.createElement("div");
            divHeader.className = 'modal-header';
            var h3 = document.createElement("h3");
            h3.classList.add('modal-title');
            h3.appendChild(document.createTextNode(type + '  Results ' + formatDate(mcdtObject.MCDT_date)));
            divHeader.appendChild(h3);
            return divHeader;
        }
        var body = function () {
            var bodyDiv = document.createElement("div");
            bodyDiv.className = 'modal-body';
            var h1, br, label;
            for (var prop in mcdtObject) {

                if (mcdtObject.hasOwnProperty(prop) && prop !== 'MCDT_ID' && prop !== 'LabExam_date_out' && prop !== 'LabExam_data_in' && prop !== 'MCDT_type' && prop !== 'MCDT_date') {
                    //The current property is not a indirect property of p
                    br = document.createElement('br');
                    label = document.createElement('label');
                    label.appendChild(document.createTextNode(prop))
                    label.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0'));

                    h1 = document.createElement('h2').appendChild(document.createTextNode(setTextNode(mcdtObject[prop])));
                    p = document.createElement('prep');
                    //p.className = 'results';
                    p.appendChild(label); p.appendChild(h1);
                    bodyDiv.appendChild(p)
                    bodyDiv.appendChild(br)
                }
            }
            function setTextNode(prop) {             
                return (prop !== null && typeof prop === 'object')?prop.Description : prop;
            }
            return bodyDiv;
        }

        var footer = function () {
            var divFooter = document.createElement("div");
            divFooter.className = 'modal-footer';
            var btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'OK';
            btn.classList.add('btn'); btn.classList.add('btn-primary');
            btn.setAttribute('ng-click', '$close()');
            divFooter.appendChild(btn);
            return divFooter;
        }
        var mainDiv = document.createElement('div');
        mainDiv.appendChild(header());
        mainDiv.appendChild(body());
        mainDiv.appendChild(footer());
        return mainDiv;
    }

    var fac = {};
    fac.Text = function (result, type) {
        var temp = createTemplate(result, type).innerHTML;;
        return $uibModal.open({
            //templateUrl: '../Content/Templates/RegularLabResults/KFTContent.html',
            template: temp,
            controller: function () {
                var vm = this;
                vm.result = result;

            },
            controllerAs: 'vm'
        });
    }

    return fac;
});
