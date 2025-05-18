// export default {
//     props: ['loggedIn'],
//     template: `
//       <div class="container-fluid p-3">
//         <!-- Search Bar & Actions -->
//         <div class="row mb-3">
//           <div class="col-md-6 mb-2">
//             <input type="text" class="form-control" placeholder="Search ..." />
//           </div>
//           <div class="col-md-2 mb-2">
//             <button class="btn btn-outline-primary w-100">Search</button>
//           </div>
//           <div class="col-md-2 mb-2">
//             <button class="btn btn-outline-success w-100" @click="$router.push('/addproduct')">Add Product</button>
//           </div>
//           <div class="col-md-2 mb-2">
//             <button class="btn btn-outline-dark w-100" @click="$router.push('/my-listings')">Group by</button>
//           </div>
//         </div>
  
//         <!-- Banner Image -->
//         <div class="mb-4">
//           <div class="bg-secondary text-white text-center py-5 rounded" style="height: 200px;">
//             <h2>Welcome to EcoFinds</h2>
//             <p>Buy, sell, and discover pre-loved treasures while helping the planet.</p>
//           </div>
//         </div>
  
//         <!-- All Categories Button -->
//         <div class="text-center mb-3">
//           <button class="btn btn-outline-primary">All products</button>
//         </div>
  
//         <!-- Category Cards -->
//         <div class="mt-5">
//           <h4>My Listings</h4>
//           <div class="row">
//             <div class="col-md-4 mb-3" v-for="item in myListings" :key="item.id">
//               <div class="card">
//                 <div v-for="product in products" :key="product.id"  class="card-body">
//                   <h5 class="card-title">{{ product.name }}</h5>
//                   <p class="card-text">Price: ₹{{ product.price }}</p>
//                   <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
//                   <button class="btn btn-success" @click="removeFromCart(product)">Go to Cart</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
  
//         <!-- My Listings Section -->
//         <div class="mt-5">
//           <h4>My Listings</h4>
//           <div class="row">
//             <div class="col-md-4 mb-3" v-for="item in myListings" :key="item.id">
//               <div class="card">
//                 <div v-for="product in products" :key="product.id" v-if="product.listedby === userData.id" class="card-body">
//                   <h5 class="card-title">{{ product.name }}</h5>
//                   <p class="card-text">Price: ₹{{ product.price }}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     `,
//     data: function () {
//       return {
//         userData:"",
//         loggedIn: localStorage.getItem('token'),
//         formData: {
//           name:'',
//           price: '',
//           category: '',
//           description: '',
//           listedby: '',
//           status: '',
//           boughtby: ''
//         },
//         searchQuery:'',
//         products:[],
//         category:[]
//       };
//     },
//     methods: {
//       logoutUser() {
//         localStorage.clear();
//         this.$router.push('/');
//         this.$emit('logout');
//       }
//     },
//     mounted(){
//       fetch('/api/get')
//       .then(response => response.json())
//       .then(data => this.products = data)

//       fetch('api/user_dashboard',{
//         method:'GET',
//         headers:{
//             "Content-Type":"application/json",
//             "Authentication-Token":localStorage.getItem("auth_token")
//         }
//     })
//     .then(response => response.json())
//     .then(data=> this.userData = data)

//     fetch('api/category')
//     .then(response => response.json())
//     .then(data => this.category = data)

//     }
    
    
//   };

export default {
  props: ['loggedIn'],
  template: `
    <div class="container-fluid p-3">

      <!-- Search Bar & Actions -->
      <div class="row mb-3">
        <div class="col-md-6 mb-2">
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Search ..." />
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn btn-outline-primary w-100" @click="filterProducts">Search</button>
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn btn-outline-success w-100" @click="$router.push('/addproduct')">Add Product</button>
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn btn-outline-dark w-100" @click="$router.push('/my-listings')">My Listings</button>
        </div>
      </div>

      <!-- Banner -->
      <div class="mb-4">
        <div class="bg-secondary text-white text-center py-5 rounded" style="height: 200px;">
          <h2>Welcome to EcoFinds</h2>
          <p>Buy, sell, and discover pre-loved treasures while helping the planet.</p>
        </div>
      </div>

      <!-- All Products Button -->
      <div class="text-center mb-3">
        <button class="btn btn-outline-primary" @click="loadProducts">All Products</button>
      </div>

      <!-- Other Users' Products -->
      <div class="row">
        <div class="col-md-4 mb-3" v-for="product in otherListings" :key="product.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Category: {{ product.category }}</p>
              <p class="card-text">Price: ₹{{ product.price }}</p>
              <button class="btn btn-primary me-2" @click="addToCart(product)">Add to Cart</button>
              <button class="btn btn-outline-success" @click="$router.push('/cart')">Go to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <!-- My Listings -->
      <div class="mt-5">
        <h4>My Listings</h4>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="product in myListings" :key="product.id">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Price: ₹{{ product.price }}</p>
                <p class="card-text">Category: {{ product.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      formData: {
        id: '',
        listedby: localStorage.getItem('user_id'),
        name: '',
        description: '',
        category: '',
        price: '',
        status: 'available'
      },
      userData: {},
      products: [],
      searchQuery: '',
      categories: []
    };
  },
  computed: {
    myListings() {
      return this.products.filter(p => Number(p.listedby) === Number(this.userData.id));
    },
    otherListings() {
      return this.products.filter(p =>
        Number(p.listedby) !== Number(this.userData.id) &&
        this.matchSearch(p)
      );
    }
  },
  methods: {
    loadProducts() {
      fetch('/api/get')
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
          return res.json();
        })
        .then(data => {
          this.products = data;
        })
        .catch(err => console.error("Failed to fetch products:", err));
    },

    addToCart(product) {
      this.formData.id = product.id;
      this.formData.name = product.name;
      this.formData.price = product.price;
      this.formData.category = product.category;
      this.formData.description = product.description;
      this.formData.status = 'carted';

      fetch('/api/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('auth_token')
        },
        body: JSON.stringify(this.formData)
      }).then(res => {
        if (!res.ok) throw new Error(`Failed to add to cart: ${res.status}`);
      })

      alert(`Added ${product.name} to cart!`);
    },
    filterProducts() {
      // No-op: triggers computed properties to update
    },
    matchSearch(product) {
      if (!this.searchQuery.trim()) return true;
      const query = this.searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query);
    },
    logoutUser() {
      localStorage.clear();
      this.$router.push('/');
      this.$emit('logout');
    }
  },
  mounted() {
    this.loadProducts();

    fetch('/api/user_dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication-Token': localStorage.getItem('auth_token')
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load user: ${res.status}`);
        return res.json();
      })
      .then(data => {
        this.userData = data;
      })
      .catch(err => console.error('Failed to fetch user data:', err));

    fetch('/api/category')
      .then(res => res.json())
      .then(data => this.categories = data)
      .catch(err => console.error('Failed to fetch categories:', err));
  }
};
