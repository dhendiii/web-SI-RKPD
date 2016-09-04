app.directive('tagJsonList', function(){
  return {
    require: 'ngModel',
    link:
        function (scope, elm, attrs, ngModel){
            scope.$watch(
                function(){
                    return ngModel.$modelValue;
                },
                function(newValue, oldValue){
                    var value = ngModel.$modelValue
                    if (value instanceof Array) return;

                    var valueArr = value ? value.split('#') : value;
                    if (!valueArr) return;
                    for (var i = 0; i < valueArr.length; i++){
                        if (valueArr[i]){
                            var splitItem = valueArr[i].split("-");
                        }
                        valueArr[i] = {
                            tag: splitItem[0] ? splitItem[0] : '',
                            name: splitItem[1] ? splitItem[1] : '',
                            text:  splitItem[2] ? splitItem[2] : ''
                        }
                    }
                    var result = valueArr;
                    ngModel.$setViewValue(result);
                }, true);
        }
    }
})
