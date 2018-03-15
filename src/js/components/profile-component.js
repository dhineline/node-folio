export default class profileComponent {
   constructor() {
     this.profileModule = $('#profileModule');
   }

   displayLogin(){
     this.profileModule.html('<li><a href="/login">Login Now</a></li>');
   }

   displayProfile() {
      this.profileModule.html('<li class="text-nowrap"><a class="logout" href="#">Logout</a></li>');
   }
}
