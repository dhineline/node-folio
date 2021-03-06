class User {

  constructor(alertModule, profileModule){
    let thisUser = this;
    this.storage = window.localStorage;
    this.alerts = alertModule;
    this.profileModule = profileModule;

    //set the login/logout module
    if(thisUser.isLoggedIn()) {
      profileModule.displayProfile();
    } else {
      profileModule.displayLogin();
    }

  }

  isLoggedIn() {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  login(values){
    if(values.email && values.email != '' && values.password && values.password != ''){
      let postValues = $.param(values);
      let thisUser = this;

      let myRequest = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: postValues
      };

      fetch('api/user/login', myRequest)
        .then(
          function(response) {
            if (response.status !== 200) {
              response.json().then(function(data) {
                if (data.message){
                  thisUser.alerts.alertMessage('Error '+response.status+' : '+ data.message);
                } else {
                  thisUser.alerts.alertMessage('Unknown Error '+response.status);
                }
              });
              return;
            }

            // if the response contains a token then save it, otherwise show error
            response.json().then(function(data) {
              if(data.token) {
                thisUser.saveToken(data.token);
                window.location = "/";
              } else if (data.message){
                thisUser.alerts.alertMessage('Error : '+ response.data.message);
                return;
              } else {
                throw 'no response from server for register user'
              }
            });
          }
        )
        .catch(function(err) {
          throw 'Unable to login user :-S'+ err;
        });

    } else {
      throw 'user.login must accept an object with email and password'
    }
  }

  newItem(values){
    if(values.title && values.title != '' && values.description && values.description != ''){
      let postValues = $.param(values);
      let thisUser = this;

      let myRequest = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Authorization": "JSON " + this.getToken()
        },
        body: postValues
      };

      fetch('api/item', myRequest)
        .then(
          function(response) {
            if (response.status !== 201 && response.status !== 401) {
              response.json().then(function(data) {
                if (data.message){
                  thisUser.alerts.alertMessage('Error '+response.status+' : '+ data.message);
                } else {
                  thisUser.alerts.alertMessage('Unknown Error '+response.status);
                }
              });
              return;
            } else if(response.status == 401) {
              thisUser.redirect('/login');
            } else {
              thisUser.redirect('/items');
            }
          }
        )
        .catch(function(err) {
          throw 'Oh no. '+ err;
        });

    } else {
      throw 'Both Fields are required'
    }
  }

  getToken() {
    return this.storage.getItem('JWT');
  }

  saveToken(token) {
    return this.storage.setItem('JWT', token);
  }

  deleteToken() {
    return this.storage.removeItem('JWT');
  }

  redirect(url) {
    if(this.isLoggedIn()) {
      $('#redirect-form').html('<form action="'+url+'" name="redirect-now" method="post" style="display:none;"><input type="text" name="token" value="' + this.getToken() + '" /></form>');
      document.forms['redirect-now'].submit();
    } else {
      window.location= url;
    }
  }

  register(values){
    if(values.email && values.email != '' && values.password && values.password != ''){

      let postValues = $.param(values);
      let thisUser = this;

      let myRequest = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: postValues
      };

      fetch('api/user/register', myRequest)
        .then(
          function(response) {
            if (response.status !== 201) {
              response.json().then(function(data) {
                if (data.message){
                  thisUser.alerts.alertMessage('Error '+response.status+' : '+ data.message);
                } else {
                  if(data.code === 11000) {
                    thisUser.alerts.alertMessage('Are you sure you are not a member? That email is already taken');
                  }else{
                    thisUser.alerts.alertMessage('Unkown error : '+response.status +' - '+ data.code);
                  }
                }
              });
              return;
            }


            // if the response contains a token then save it, otherwise show error
            response.json().then(function(data) {
              if(data.token) {
                thisUser.saveToken(data.token);
                window.location = "/";
              } else if (data.message){
                thisUser.alerts.alertMessage('Error : '+ data.message);
              } else {
                throw 'no response from server for register user'
              }
            });
          }
        )
        .catch(function(err) {
          throw 'Unable to register user :-S'+ err;
        });

    } else {
      throw 'user.register must accept an object with email and password'
    }
  }

  logout() {
    this.deleteToken();
    this.profileModule.displayLogin();
  }

}

export default User;
