// Your corresponding keys
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");

// For back4app applications, this url is
// 'https://parseapi.back4app.com'
Parse.serverURL = 'YOUR_SERVER_URL'



Vue.component('login-component', {
    template: '<div class="signin-wrapper text-center"> \
    <form class="form-signin"> \
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1> \
      <label for="inputEmail" class="sr-only">Email address</label> \
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""> \
      <label for="inputPassword" class="sr-only">Password</label> \
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""> \
        <button class="btn btn-lg btn-primary btn-block" type="button">Sign in</button> \
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p> \
    </form> \
  </div>'
})


Vue.component("home-component", {
    template : "<div> \
    <h1> Hello World! </h1> \
    </div>"
})

const app = new Vue({}).$mount('#app')
