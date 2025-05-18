// export default {
//     template: `
//     <div class="container mt-4">
//       <h3 class="mb-4">Add New Product</h3>
//       <form @submit.prevent="submitProduct">

//         <div class="mb-3">
//           <label class="form-label">Product Name</label>
//           <input v-model="form.name" type="text" class="form-control" required />
//         </div>

//         <div class="mb-3">
//           <label class="form-label">Category</label>
//           <select v-model="form.category" class="form-select" required>
//             <option disabled value="">Select Category</option>
//             <option v-for="cat in categories" :key="cat.name" :value="cat.name">
//               {{ cat.name }}
//             </option>
//           </select>
//         </div>

//         <div class="mb-3">
//           <label class="form-label">Description</label>
//           <textarea v-model="form.description" class="form-control" rows="3" required></textarea>
//         </div>

//         <div class="mb-3">
//           <label class="form-label">Price (₹)</label>
//           <input v-model="form.price" type="number" class="form-control" required />
//         </div>

//         <button type="submit" class="btn btn-success">Add Product</button>
//       </form>

//       <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
//     </div>
//   `,
//     data() {
//       return {
//         formData: {
//           listedby: localStorage.getItem('user_id'),
//           name: '',
//           description: '',
//           category: '',
//           price: ''
//         },
//         message: '',
//         categories: []
//       };
//     },
//     methods: {
//         submitProduct() {
//             fetch('/api/post', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authentication-Token': localStorage.getItem('auth_token')
//               },
//               body: JSON.stringify(this.formData)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 alert(data.message);
//         })
//           }
//     } ,
//     mounted() {
//       fetch('/api/category')
//         .then(res => res.json())
//         .then(data => {
//           this.categories = data;
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }  
//   };

export default {
    template: `
      <div class="container mt-4">
        <h3 class="mb-4">Add New Product</h3>
        <form @submit.prevent="submitProduct">
  
          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input v-model="formData.name" type="text" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Category</label>
            <select v-model="formData.category" class="form-select" required>
              <option disabled value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.name" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>
  
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="formData.description" class="form-control" rows="3" required></textarea>
          </div>
  
          <div class="mb-3">
            <label class="form-label">Price (₹)</label>
            <input v-model="formData.price" type="number" class="form-control" required />
          </div>
  
          <button type="submit" class="btn btn-success">Add Product</button>
        </form>
  
        <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
      </div>
    `,
    data() {
      return {
        formData: {
          listedby: localStorage.getItem('user_id'),
          name: '',
          description: '',
          category: '',
          price: ''
        },
        message: '',
        categories: []
      };
    },
    methods: {
      submitProduct() {
        fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('auth_token')
          },
          body: JSON.stringify(this.formData)
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
          })
          .catch(err => {
            console.error('Error:', err);
          });
      }
    },
    mounted() {
      fetch('/api/category')
        .then(res => res.json())
        .then(data => {
          // Defensive: filter out invalid values
          this.categories = data.filter(c => c && c.name);
        })
        .catch(err => {
          console.error('Error fetching categories:', err);
        });
    }
  };
  