class App {

  constructor(alertModule, user){
    let app = this;
    this.user = user;
    this.alerts = alertModule;
    console.log('app created');

    //attach handlers for login/logout
    $('#registerForm').submit(function(e) {
      e.preventDefault();

      var options = {
        rules: {
          password: {
            required: true,
            minlength: 8
          },
          passwordCheck: {
            required: true,
            equalTo: '#inputPassword'
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          password: 'Your password must be at least 8 characters.  Pick something strong.',
          passwordCheck: 'Psst!  Make sure your passwords match.',
          email: 'please use a real email address'
        }
      };

      $(this).validate(options);
      if($(this).valid()){
        let values = app.getFormData(this);
        user.register(values);
      }
    });

    $('#loginForm').submit(function(e) {
      e.preventDefault();

      var options = {
        rules: {
          password: {
            required: true,
            minlength: 8,
            maxlength: 20
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          password: 'Your password must be at least 8 characters.  Pick something strong.',
          email: 'please use a real email address'
        }
      };

      $(this).validate(options);
      if($(this).valid()){
        let values = app.getFormData(this);
        user.login(values);
      }
    });

    $('#itemForm').submit(function(e) {
      e.preventDefault();

      var options = {
        rules: {
          title: {
            required: true,
            minlength: 3,
            maxlength: 56
          },
          description: {
            required: true,
            minlength: 3,
            maxlength: 256
          }
        },
        messages: {
          title: 'A title is required and can be up to 56 characters',
          description: 'A description of up to 256 characters is required'
        }
      };

      $(this).validate(options);
      if($(this).valid()){
        let values = app.getFormData(this);
        user.newItem(values);
      }
    });

    $('.logout').on('click', function(e) {
      e.preventDefault();
      app.user.logout();
    });

    $('a').on('click', function(e) {
      let href = $(this).attr('href');
      if(href && href !== '' && href !== '#'){
        if( location.hostname === this.hostname || !this.hostname.length ) {
          app.user.redirect(href);
          e.preventDefault();
        }
      }
    });

  }

  getFormValuesFromButton(button) {
    let form = this.getButtonForm(button);
    return this.getFormData(form);
  }

  getButtonForm(button) {
    return $(button).parents('form');
  }

  getFormData(form) {
    var unindexed_array = $(form).serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

}

export default App;
