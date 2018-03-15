//import jquery and plugins
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('imports-loader?window.jQuery=jquery!./../../node_modules/jquery-validation/dist/jquery.validate.min');
 
//GRAB THE CSS AND TRANSPILE AND BUNDLE IT TOO
import './../scss/app.scss';

//include Components
import User from './components/user';
import App from './components/app';

//ie10 viewport hack for surface/desktop windows 8
import './ie10-viewport-bug-workaround';

document.addEventListener("DOMContentLoaded",()=>{
  let user = new User();
  let app = new App(user);
});

let testFunction = (msg) => {
  console.log(msg)
}

testFunction('bundle being created');
