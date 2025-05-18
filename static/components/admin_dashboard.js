export default {
    template: `
      <div class="container py-4">
        <h2>Admin Dashboard</h2>
  
        <h4>Users</h4>
        <ul>
          <li v-for="user in users" :key="user.id" v-if ="user.id!=1">
            {{ user.email }} 
            <button @click="deleteUser(user.id)">Delete</button>
          </li>
        </ul>
  
        <h4>Products</h4>
        <ul>
          <li v-for="product in products" :key="product.id">
            {{ product.name }} - ₹{{ product.price }} ({{ product.status }})
            <button @click="toggleStatus(product)">Toggle Status</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </li>
        </ul>
      </div>
    `,
    data() {
      return {
        users: [],
        products: []
      };
    },
    methods: {
      fetchData() {
        fetch('/admin/users')
          .then(res => res.json())
          .then(data => this.users = data);
        fetch('/admin/products')
          .then(res => res.json())
          .then(data => this.products = data);
      },
      deleteUser(id) {
        if (confirm('Delete user?')) {
          fetch(`/admin/delete_user/${id}`, { method: 'DELETE' })
            .then(() => this.fetchData());
        }
      },
      deleteProduct(id) {
        if (confirm('Delete product?')) {
          fetch(`/admin/delete_product/${id}`, { method: 'DELETE' })
            .then(() => this.fetchData());
        }
      },
      toggleStatus(product) {
        const newStatus = product.status === 'available' ? 'sold' : 'available';
        fetch(`/admin/update_product/${product.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ status: newStatus })
        }).then(() => this.fetchData());
      }
    },
    mounted() {
      fetch('/api/getusers', { method: 'GET' })
        .then(res => res.json())
        .then(data => this.users = data);
      fetch('/api/get', { method: 'GET' })
        .then(res => res.json())
        .then(data => this.products = data);
      this.fetchData();
    }
  };
  