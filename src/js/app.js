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
import profileComponent from './components/profile-component';
import alertComponent from './components/alert-component';

//ie10 viewport hack for surface/desktop windows 8
import './ie10-viewport-bug-workaround';

document.addEventListener("DOMContentLoaded",()=>{
  let profileModule = new profileComponent();
  let alertModule = new alertComponent();
  let user = new User(alertModule, profileModule);
  let app = new App(alertModule, user);
});
