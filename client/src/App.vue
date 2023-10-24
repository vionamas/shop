<template>
  <div class="product-container">
    <div class="form-container">
      <!-- <h1 class="text-3xl font-bold underline text-blue-800">Products</h1> -->
      <form class="flex flex-col">
        <label for="name">Name</label>
        <input name="name" v-model="name" />
        <label for="type">Type</label>
        <input name="type" v-model="type" />
        <label for="description">Description</label>
        <input name="description" v-model="description" />
        <label for="price">Price</label>
        <input name="price" v-model="price" />
        <label for="image">Image</label>
        <input name="image" v-model="image" />
        <button class="mt-2" @click.prevent="postProduct">Add Product</button>
      </form>
    </div>
    <ul class="product-grid">
      <li v-for="product in products" :key="product.id" class="product-item">
        <div class="product-details" @click.prevent="getProduct(product.id)">
          <h2>{{ product.name }}</h2>
          <p>Type: {{ product.type }}</p>
          <p>Description: {{ product.description }}</p>
          <p>Price: {{ product.price }}€</p>
        </div>
        <img :src="product.image" alt="Product Image" class="product-image">
        <div class="flex justify-center m-3 space-x-2">
          <button @click.prevent="deleteProduct(product.id)" class="delete-button bg-red-500 hover:bg-red-400 text-xs">Eliminar</button>
          <button @click.prevent="updateProduct(product.id)" class="bg-blue-500 hover:bg-blue-400 text-xs">Update</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      products: [],
      product: "",
      name: "",
      type: "",
      description: "",
      price: "",
      image: "",
    };
  },
  created() {
    this.getProducts(); // Carga los productos al iniciar la página
  },
  methods: {
    async getProducts() {
      const response = await fetch('http://localhost:2322/api/home-products')
      const data = await response.json();
      this.products = data.data;
    },
    async getProduct(id) {
      const response = await fetch(`http://localhost:2322/api/home-products/${id}`)
      const data = await response.json();
      this.products = data.data;
    },
    async postProduct() {
      const newProduct = {
        name: this.name,
        type: this.type,
        description: this.description,
        price: this.price,
        image: this.image
      };
      this.name = "";
      this.type = "";
      this.description = "";
      this.price = "";
      this.image = "";
      const response = await fetch("http://localhost:2322/api/home-products", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      this.products.push(data.data);
    },
    async updateProduct(id) {
      const newProduct = {
        name: this.name,
        type: this.type,
        description: this.description,
        price: this.price,
        image: this.image
      };
      this.name = "";
      this.type = "";
      this.description = "";
      this.price = "";
      this.image = "";
      const response = await fetch(
        `http://localhost:2322/api/home-products/${id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      const data = await response.json();
      console.log(data.data);
      return this.getProducts();
    },
    async deleteProduct(id) {
      try {
        const response = await fetch(
          `http://localhost:2322/api/home-products/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        return this.getProducts();
      } catch (err) {
        console.log(err, "deleteProduct failed");
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  align-items: flex-start;
}

.form-container {
  flex: 0 0 20%; /* Ancho fijo para el formulario (ajusta según tus necesidades) */
  padding: 20px; /* Espacio entre el formulario y el grid */
}

.product-grid {
  flex: 1; 
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
}

.product-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  color: black;
  background-color: #f1f0e4;
  cursor: pointer;
 
  overflow: hidden; /* Oculta el contenido que desborda la altura máxima */
}

.product-details {
  flex-grow: 1;
  padding: 10px;
  overflow: hidden; /* Controla el contenido que desborda en las celdas */
}

.product-image {
  max-width: 100%;
  height: auto;
}

h2 {
  font-size: 1rem;
  font-weight: 800;
}

p {
  font-weight: 200;
}

input {
  background-color: #f1f0e4;
  color: black;
  font-style: italic;
  margin-bottom: 15px;
}

form {
  color: black;
  text-align: left;
}

button {
  color: white;
}
</style>
