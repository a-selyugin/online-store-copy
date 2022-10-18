export const fakeBody = `<header class="nav-header">
<div class="wrapper flex-wrap" id="header">
  <a class="logo" href="#"><img class="img-logo" src="./assets/icons/skull_logo.png" alt="Logo"></a>
</div>
</header>
<main>
<div class="wrapper shop-section">
  <section class="filters">
    <input type="search" id="search-input" name="search-input" placeholder="Search" class="search-input" value="" autocomplete="off" autofocus>
    <div class="text-filters">
      <div class="artists" id="artists">
        <h3>Artists</h3>
      </div>
      <div class="categories" id="categories">
        <h3>Category</h3>
      </div>
      <div class="color" id="color">
        <h3>Color</h3>
      </div>
    </div>
    <div class="sliders" id="sliders"></div>
    <div class="popular" id="popular">
      <h3>Other</h3>
    </div>
    <div class="reset">
      <button class="reset-button" id="reset-button">Reset</button>
    </div>
  </section>
  <div>
    <section class="sort-by">
      <div id="found-items">Found some items</div>
      <hr>
      <form action="">
        <label for="sort">Sort by</label>
        <select name="sort" id="sort" class="sort-select">
          <option value="price-low-high">Price: Low-High</option>
          <option value="price-high-low">Price: High-Low</option>
          <option value="name-a-z">Name: A-Z</option>
          <option value="name-z-a">Name: Z-A</option>
          <option value="year-new-old">Year: New-Old</option>
          <option value="year-old-new">Year: Old-New</option>
        </select>
      </form>
    </section>
    <section class="product-zone" id="products">
    </section>
  </div>
</div>
</main>
<footer class="footer">
<div class="wrapper flex-wrap">
  <div>
    <a href="https://rs.school/" target="_blank" class="rs-link">
      <img class="img-logo" src="./assets/icons/rs-logo.svg" alt="Logo">
    </a>
  </div>
  <div>
    <a href="https://github.com/a-selyugin" target="_blank" class="github-link">
      <img src="./assets/icons/GitHub-logo.png" alt="GitHub" class="gh-logo">
      <span>a-selyugin, 2022</span>
    </a>
  </div>
</div>
</footer>
<template id="product-template">
<div class="prod-card">
  <div class="prod-card__image">
    <img class="prod-card__image_int" src="#" alt="">
  </div>
  <div class="prod-card__legend">
    <div class="prod-card__first-line">
      <div class="prod-card__price"></div>
      <div class="prod-card__qty"></div>
    </div> 
    <div class="prod-card__name"></div>
    <div class="prod-card__type"></div>
    <div class="prod-card__artist"></div>
    <div class="prod-card__sizes"></div>
    <div class="prod-card__year"></div>
  </div>
</div>
</template>`;
