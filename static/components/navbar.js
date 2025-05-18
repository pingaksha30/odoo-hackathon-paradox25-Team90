export default {
    props: ['loggedIn'],
    template:`<div class="row border">
    <div class="col-10 fs-2" >
         <router-link to="/">EcoFinds</router-link>
    </div>
    <div class="col-2" >
    
        <router-link v-if="!loggedIn" class="btn btn-primary my-2" to="/login">Login</router-link>
        <router-link v-if="!loggedIn" class="btn btn-primary my-2" to="/register_customer">Register</router-link>
    
        <button v-if="loggedIn" class="btn btn-danger my-2" @click="logoutUser">Logout</button>
    </div>
    </div>

</div>`,
data: function() {
    return {
        loggedIn: localStorage.getItem('token')
    };
},
methods: {
    logoutUser() {
        localStorage.clear();
        this.$router.go('/');
        this.$emit('logout');
    }
},
}