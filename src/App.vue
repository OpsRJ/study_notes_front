<template>
  <div class="row">
    <nav>
      <div class="nav-wrapper indigo darken-4">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><router-link to="/protected/home">Logado</router-link></li>
        </ul>
      </div>
    </nav>
  </div>

  <div class="container">
    <router-view />
  </div>
</template>