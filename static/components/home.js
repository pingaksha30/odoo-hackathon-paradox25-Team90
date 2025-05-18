export default {
  template: `
  <div>
    <header class="bg-green-600 text-white text-center py-5">
      <div class="container">
        <h1 class="text-4xl font-bold">Welcome to EcoFinds</h1>
        <p class="text-lg mt-2">Buy, sell, and discover pre-loved treasures while helping the planet.</p>
      </div>
    </header>

    <section class="py-10 bg-gray-100">
      <div class="container text-center">
        <h2 class="text-2xl font-semibold">Why Choose EcoFinds?</h2>
        <p class="mt-4 text-gray-700 max-w-2xl mx-auto">
          EcoFinds is your go-to marketplace for sustainable shopping. By buying and selling second-hand items,
          you’re not just saving money — you’re reducing waste and making a positive impact on the environment.
          Whether it's clothes, books, electronics, or furniture, every item gets a new life here.
        </p>
      </div>
    </section>

    <section class="py-10">
      <div class="container grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">Simple Listings</h3>
          <p class="text-gray-600">Create and manage listings with just a few clicks. Add title, price, and image.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">Smart Filters</h3>
          <p class="text-gray-600">Easily browse items by category, location, and keywords to find what you need.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">Eco-Friendly Impact</h3>
          <p class="text-gray-600">Join a community that values sustainability and responsible consumption.</p>
        </div>
      </div>
    </section>
  </div>
  `
}
