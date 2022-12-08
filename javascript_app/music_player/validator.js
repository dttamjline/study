function Validator(options) {
    let formElement = document.querySelector(options.form);
    //console.log(formElement);
    if (formElement) {
        //console.log(options.rules);
        options.rules.forEach(function (rule) {
            // console.log(rule);
            let inputElements = Object.values(
                formElement.querySelectorAll(rule.selector)
            );

            for (input of inputElements) {
                console.log(input);
                let errorElement =
                    input.parentElement.querySelector('.modal_form_error');
                console.log(errorElement);
                input.onblur = function (e) {
                    let _this = this;
                    // console.log(e.target.value);
                    let errorMess = rule.test(e.target.value);
                    if (errorMess) {
                        errorElement.innerHTML = errorMess;
                        _this.parentElement.classList.add('invalid');
                    } else {
                        errorElement.innerHTML = '';
                        _this.parentElement.classList.remove('invalid');
                    }
                };
                input.oninput = function (e) {
                    let _this = this;
                    let errorMess = rule.test(e.target.value);
                    if (errorMess) {
                        errorElement.innerHTML = errorMess;
                        _this.parentElement.classList.add('invalid');
                    } else {
                        errorElement.innerHTML = '';
                        _this.parentElement.classList.remove('invalid');
                    }
                };
            }

            //console.log(inputElements);
        });
        formElement.onsubmit = function (e) {
            e.prevenDefalut();
            let isValid = false;
        };
    }
}
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        },
    };
};
// Validator({
//     form: '.modal_form',
//     rules: [Validator.isRequired('.modal_form_input')],
// });
export default Validator;
