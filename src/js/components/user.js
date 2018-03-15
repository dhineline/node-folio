class User {

  constructor(){
    console.log('user created');
  }

  login(values){
    //console.log(values);
    if(values.email && values.email != '' && values.password && values.password != ''){
      console.log('login user with email '+values.email+' and password '+values.password);
    } else {
      throw 'user.login must accept an object with email and password'
    }
  }

  register(values){
    //console.log(values);
    if(values.email && values.email != '' && values.password && values.password != ''){
      console.log('register user');
    } else {
      throw 'user.register must accept an object with email and password'
    }
  }

  isLoggedIn() {
    return true;
  }

  logout() {
    console.log('log the user out');
  }

}

export default User;
