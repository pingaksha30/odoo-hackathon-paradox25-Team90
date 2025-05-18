export default {
    props: ['loggedIn'],
    template: `
      <div class="container-fluid p-3">
        <!-- Search Bar & Actions -->
        <div class="row mb-3">
          <div class="col-md-6 mb-2">
            <input type="text" class="form-control" placeholder="Search ..." />
          </div>
          <div class="col-md-2 mb-2">
            <button class="btn btn-outline-primary w-100">Search</button>
          </div>
          <div class="col-md-2 mb-2">
            <button class="btn btn-outline-success w-100" @click="$router.push('/add-product')">Add Product</button>
          </div>
          <div class="col-md-2 mb-2">
            <button class="btn btn-outline-dark w-100" @click="$router.push('/my-listings')">Group by</button>
          </div>
        </div>
  
        <!-- Banner Image -->
        <div class="mb-4">
          <div class="bg-secondary text-white text-center py-5 rounded" style="height: 200px;">
            <h2>Banner Image</h2>
          </div>
        </div>
  
        <!-- All Categories Button -->
        <div class="text-center mb-3">
          <button class="btn btn-outline-primary">All Categories</button>
        </div>
  
        <!-- Category Cards -->
        <div class="row text-center">
          <div class="col-md-4 mb-3" v-for="n in 3" :key="n">
            <div class="border p-4 rounded">Category {{ n }}</div>
          </div>
        </div>
  
        <!-- My Listings Section -->
        <div class="mt-5">
          <h4>My Listings</h4>
          <div class="row">
            <div class="col-md-4 mb-3" v-for="item in myListings" :key="item.id">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">Price: ₹{{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data: function () {
      return {
        loggedIn: localStorage.getItem('token'),
        myListings: [
          { id: 1, title: 'Second-hand Book', price: 200 },
          { id: 2, title: 'Used Desk Lamp', price: 500 },
          { id: 3, title: 'Old Guitar', price: 1500 }
        ]
      };
    },
    methods: {
      logoutUser() {
        localStorage.clear();
        this.$router.push('/');
        this.$emit('logout');
      }
    }
  };
  