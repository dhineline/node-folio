export default class alertComponent {
   constructor() {
     let alertModule = this;
     console.log('alert component created');

     $('#alertbarClose').on('click', function(e) {
       e.preventDefault();
       console.log('on click'+alertModule);
       alertModule.hideAlert();
     });

   }

   alertMessage (alert) {
    console.log('alert the following: '+alert);
     $('#alertbarMessage').html(alert);
     $('#alertbar').removeClass('hidden');
   }

   hideAlert () {
     console.log('hide called with ');
     $('#alertbar').addClass('hidden');
   }
}
