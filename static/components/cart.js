export default {
    template: `
      <div class="container p-3">
        <h2>My Cart</h2>
        <div v-if="cart.length === 0" class="alert alert-info">
          Your cart is empty.
        </div>
  
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="item.product_id">
                <td>{{ item.name }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <input type="number" min="1" v-model.number="item.quantity"
                         class="form-control" style="width: 80px;" @change="updateQuantity(index)" />
                </td>
                <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="removeFromCart(index)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <div class="d-flex justify-content-between align-items-center">
            <h4>Total: ₹{{ cartTotal.toFixed(2) }}</h4>
            <button class="btn btn-success" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        cart: []
      };
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    methods: {
      updateQuantity(index) {
        if (this.cart[index].quantity < 1) {
          this.cart[index].quantity = 1;
        }
        this.saveCart();
      },
      removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
      },
      saveCart() {
        localStorage.setItem('ecoCart', JSON.stringify(this.cart));
      },
      checkout() {
        alert('Checkout functionality not implemented yet.');
      },
      loadCartFromBackend() {
        fetch('/api/getcart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('auth_token')
          }
        })
        .then(res => {
          if (!res.ok) throw new Error('Failed to load cart');
          return res.json();
        })
        .then(data => {
          this.cart = data.map(item => ({
            ...item,
            quantity: item.quantity || 1
          }));
          this.saveCart();
        })
        .catch(err => {
          console.error('Failed to fetch cart:', err);
          this.loadCartFromLocalStorage();  // fallback
        });
      },
      loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('ecoCart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
      }
    },
    mounted() {
      this.loadCartFromBackend();
    }
  };
  