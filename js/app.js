// Your corresponding keys
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");

// For back4app applications, this url is
// 'https://parseapi.back4app.com'
Parse.serverURL = 'YOUR_SERVER_URL'

// ... Parse initialization ^
// Assign LoginComponent
const LoginComponent = Vue.component('login-component', {
    template: '<div class="signin-wrapper text-center"> \
    <form class="form-signin"> \
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1> \
      <label for="inputEmail" class="sr-only">Email address</label> \
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""> \
      <label for="inputPassword" class="sr-only">Password</label> \
      <input  v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required=""> \
      <button v-on:click="login" class="btn btn-lg btn-primary btn-block" type="button">Sign in</button> \
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p> \
    </form> \
  </div>',
  data : function () {
    return {
      email : "",
      password  : ""
    }
  },
  methods : {
    login () {
      if (this.email.length === 0) {
        alert("Please enter an email");
        return;
      }
      if (this.password.length === 0) {
        alert("Please enter a password");
        return;
      }

      Parse.User.logIn(this.email, this.password)
      .then(() => {
        // Used an arrow function here because I 
        // want to access 'this' which is overridden in
        // a conventional function
        this.$router.replace("/");
      })
      .catch(function(e) {
        alert ("Error logging in! " + e.message);

      });
    }
  }
})

// Assign HomeComponent
const HomeComponent = Vue.component("home-component", {
    template : "<div> \
    <h1> Hello World! </h1> \
    </div>",
    mounted : function () {
      if (!Parse.User.current()) {
        this.$router.replace("/login");
      }
    }
})
// Declare the route mapping
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/login', component: LoginComponent }
]
// Initialize the router
const router = new VueRouter({
  routes // short for `routes: routes`
});
// Attach the router to the vue instance
const app = new Vue({
  router
}).$mount('#app')
