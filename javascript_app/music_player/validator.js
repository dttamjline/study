// function Validator(options) {
//     let formElement = document.querySelector(options.form);
//     // console.log(formElement);
//     if (formElement) {
//         // console.log(options.rules);
//         options.rules.forEach(function (rule) {
//             // console.log(rule);
//             let inputElements = Object.values(
//                 formElement.querySelectorAll(rule.selector)
//             );

//             for (let input of inputElements) {
//                 console.log(input);
//                 let errorElement =
//                     input.parentElement.querySelector('.modal_form_error');
//                 //  console.log(errorElement);
//                 input.onblur = function (e) {
//                     let _this = this;
//                     // console.log(e.target.value);
//                     let errorMess = rule.test(e.target.value);
//                     if (errorMess) {
//                         errorElement.innerHTML = errorMess;
//                         _this.parentElement.classList.add('invalid');
//                     } else {
//                         errorElement.innerHTML = '';
//                         _this.parentElement.classList.remove('invalid');
//                     }
//                 };
//                 input.oninput = function (e) {
//                     let _this = this;
//                     let errorMess = rule.test(e.target.value);
//                     if (errorMess) {
//                         errorElement.innerHTML = errorMess;
//                         _this.parentElement.classList.add('invalid');
//                     } else {
//                         errorElement.innerHTML = '';
//                         _this.parentElement.classList.remove('invalid');
//                     }
//                 };
//             }

//             //console.log(inputElements);
//         });
//         formElement.onsubmit = function (e) {
//             e.preventDefault();
//             // console.log(e.target);
//             options.rules.forEach(function (rule) {
//                 let inputElements = Object.values(
//                     formElement.querySelectorAll(rule.selector)
//                 );

//                 for (let input of inputElements) {
//                     let errorElement =
//                         input.parentElement.querySelector('.modal_form_error');
//                     let errorBorder =
//                         input.parentElement;
//                         let errorMess = rule.test(e.target.value);
//                     if (input.value === '') {
//                         errorElement.innerHTML = errorMess;
//                         errorBorder.classList.add('invalid');
//                         isSuccess = false;
//                         document.querySelector('.modal').classList.remove('show');
                      
//                     } else {
//                         errorElement.innerHTML = '';
//                         errorBorder.classList.remove('invalid');
//                         isSuccess = true;
//                     }
//                 }
//             });
//         };
//     }
// }
// Validator.isRequired = function (selector) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value ? undefined : 'Vui lòng nhập trường này';
//         },
//     };
// };
// Validator({
//     form: '.modal_form',
//     rules: [Validator.isRequired('.modal_form_input')],
// });
// export default Validator;
