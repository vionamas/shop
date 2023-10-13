<template>
  
  <div>
    <h1 class="text-3xl font-bold underline text-blue-800">
      Hello world!
    </h1>
    <button @click.prevent="getProducts">Get products</button>
    <!-- <ul>
      <li class="text-yellow-800" v-for="product in products" :key="product.id" @click.prevent="getProduct(product.id)">{{
        product.name }}</li>
    </ul> -->
    
  </div>

  <!-- grid -->
  <ul class="product-grid">
  <li v-for="product in products" :key="product.id" @click.prevent="getProduct(product.id)" class="product-item">
    <div class="product-details">
      <h2>{{ product.name }}</h2>
      <p>Type: {{ product.type }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Price: {{ product.price }}€</p>
    </div>
    <img :src="product.image" alt="Product Image" class="product-image">
  </li>
</ul>

<!-- ** -->

  <div class="flex items-center gap-10">
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
      <button class="mt-2" @click.prevent="postProduct">Add product</button>
    </form>

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
  methods: {
    async getProducts() {
      const response = await fetch('http://localhost:2322/api/home-products')
      const data = await response.json();
      console.log(data.data) //data.data es el array que yo quiero
      return this.products = data.data
    },

    async getProduct(id) {
      const response = await fetch(`http://localhost:2322/api/home-products/${id}`)
      const data = await response.json();
      console.log(data.data) //data.data es el array que yo quiero
      return this.products = data.data
    },
    async postProduct() {
      const newProduct = {
        name: this.name,
        type: this.type,
        description: this.description,
        price: this.price,
        image: this.image
      }
      const response = await fetch("http://localhost:2322/api/home-products", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newProduct)
      })
      const data = await response.json()
      return this.products.push(data.data)

    }

  },
};
</script>

<style>

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Ajusta el tamaño de las columnas según el contenido */
  gap: 20px; /* Espacio entre los elementos del grid */
  list-style: none; /* Elimina los puntos de la lista */
  padding: 0;
}

.product-item {
  display: flex;
  color: black;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.product-details {
  flex-grow: 1; /* Para que los detalles llenen el espacio disponible en el elemento */
}

.product-image {
  max-width: 100%;
  height: auto;
}

h2{
  font-size: 1rem;
  font-weight: 800;
}

p{
  font-weight: 200;
}
</style>
