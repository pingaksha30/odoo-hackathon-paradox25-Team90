export default {
    template: `
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="border p-4 rounded shadow bg-light" style="width: 350px;">
            <h3 class="text-center mb-3">Register</h3>

            <div class="mb-3">
                <label for="email" class="form-label">Your Email:</label>
                <input type="text" id="email" v-model="formData.email" class="form-control">
            </div>

            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" id="username" v-model="formData.username" class="form-control">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Create a New Password:</label>
                <input type="password" id="password" v-model="formData.password" class="form-control">
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">Enter Your Address:</label>
                <input type="text" id="address" v-model="formData.address" class="form-control">
            </div>

            <div class="mb-3">
                <label for="pincode" class="form-label">Enter Your Pincode:</label>
                <input type="text" id="pincode" v-model="formData.pincode" class="form-control">
            </div>

            <div class="text-center">
                <button class="btn btn-primary" @click="registerUser">Register</button>
            </div>
        </div>
    </div>  
    `,

    data() {
        return {
            formData: {
                email: "",
                password: "",
                username:"",
                address:"",
                pincode:"",
            }
        };
    },

    methods: {
        registerUser() {
            fetch('/api/register',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(this.formData)// the content goes to backend as json string
            } )
            .then(response => response.json())
            .then(data=> {
                alert(data.message)
                this.$router.push("/login")
            })
                
        }
    }
};