export default {
    template: `
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="border p-4 rounded shadow bg-light" style="width: 350px;">
            <h3 class="text-center mb-3">Login</h3>

            <p class="text-danger text-center">{{ message }}</p>

            <div class="mb-3">
                <label for="email" class="form-label">Enter Your Email:</label>
                <input type="text" id="email" v-model="formData.email" class="form-control">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Enter Your Password:</label>
                <input type="password" id="password" v-model="formData.password" class="form-control">
            </div>

            <div class="text-center">
                <button class="btn btn-primary" @click="loginUser">Login</button>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            formData: {
                email: "",
                password: ""
            },
            message:""
        };
    },

    methods: {
        loginUser() {
            fetch('/api/login',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(this.formData)// the content goes to backend as json string
            } )
            .then(response => response.json())
            .then(data=> {
                if(Object.keys(data).includes("auth-token")){
                localStorage.setItem("auth_token", data['auth-token'])
                localStorage.setItem("id", data.id)
                localStorage.setItem("username", data.username)
                if (data.roles.includes("customer")){
                   this.$router.push("/user_dashboard")}
                else if (data.roles.includes("admin")){
                    this.$router.push("/admin_dashboard")
                }
                
                }
                else{
                    this.message = data.message
                }
            })
                
        }
    }
};