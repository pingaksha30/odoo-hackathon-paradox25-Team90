import Home from './components/home.js'
import Login from './components/login.js'
import Admin_Dashboard from './components/admin_dashboard.js'
import Register_Customer from './components/register_customer.js'
import cart from './components/cart.js'
import Footer from './components/footer.js'
import Navbar from './components/navbar.js'
import User_Dashboard from './components/user_dashboard.js'
import Add_Product from './components/addproducts.js'


const routes=[
    {path:'/', component:Home},
    {path:'/login', component:Login},
    {path:'/register_customer', component:Register_Customer},
    {path:'/user_dashboard', component:User_Dashboard},
    {path:'/addproduct', component:Add_Product},
    {path:'/cart', component:cart},
    {path:'/admin_dashboard', component:Admin_Dashboard},
]
  

const router = new VueRouter({
    routes
})

const app = new Vue({
    el:"#app",
    router,
    template:`<div class="container">
       <nav-bar :loggedIn = 'loggedIn' @logout="handleLogout"></nav-bar>
       <router-view :loggedIn = 'loggedIn' @login="handleLogin"></router-view>
       <foot></foot>
    </div>`,
    data:{
        section:"Frontend",
        loggedIn: false
    },
    components:{
        'nav-bar':Navbar,
        'foot':Footer,
    },
    methods: {
        handleLogout(){
            this.loggedIn = false
        },
        handleLogin(){
            this.loggedIn = true
        }
    } 
})