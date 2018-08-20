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
  data: function () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
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
        .catch(function (e) {
          alert("Error logging in! " + e.message);

        });
    }
  }
})

// Assign HomeComponent
const HomeComponent = Vue.component("home-component", {
  template: "<div> \
    <button class='btn btn-secondary m-2' v-on:click='logout'> Logout </button> \
    <div class='container'>\
      <input style='max-width: 500px;' class='form-control mx-auto' type='text' v-model='newTodo' v-on:keyup.enter='addTodo'> \
      <div style='max-width: 500px;' class='card mx-auto' v-for='todo in todos'> \
        <div class='card-body'> \
            <button v-on:click='deleteTodo(todo)' type='button' class='close'> \
              <span>&times;</span> \
          </button> \
          <p> {{todo.get('text')}} </p> \
        </div> \
      </div>  \
    </div> \
    </div>",
  mounted: function () {
    if (!Parse.User.current()) {
      this.$router.replace("/login");
      return;
    }

    this.fetchTodos();
  },
  data: function () {
    return {
      todos: [],
      newTodo: ""
    }
  },
  methods: {
    logout () {
      Parse.User.logOut()
      .catch(function(e) {})
      .then(() => {
        this.$router.replace("/login");
      })
    },
    fetchTodos() {
      new Parse.Query("Todo").descending("createdAt").find()
        .then((todos) => {
          this.todos = todos;
        })
    },
    addTodo() {
      if (!this.newTodo || this.newTodo.length === 0) return;

      var todo_acl = new Parse.ACL();
      todo_acl.setWriteAccess( Parse.User.current(), true);
      todo_acl.setPublicReadAccess( true);

      var todoParseObject = new Parse.Object("Todo", {
          "text": this.newTodo
        });
      todoParseObject.setACL(todo_acl);
      todoParseObject.save()
        .then((newTodo) => {
          this.todos = [newTodo].concat(this.todos);
          this.newTodo = "";
        })
        .catch((function (e) {
          alert("Error saving todo! " + e.message);
        }))

    },

    deleteTodo(todo) {
      todo.destroy()
      .then(() => {
        this.fetchTodos();
      })
      .catch(function(e) {
        alert("Error destroying todo! " + e.message);
      })
    }
  }
})
// Declare the route mapping
const routes = [{
    path: '/',
    component: HomeComponent
  },
  {
    path: '/login',
    component: LoginComponent
  }
]
// Initialize the router
const router = new VueRouter({
  routes // short for `routes: routes`
});
// Attach the router to the vue instance
const app = new Vue({
  router
}).$mount('#app')