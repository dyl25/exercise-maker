<template>
  <nav class="navbar is-primary" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/exercices">Exercices</router-link>
        <router-link class="navbar-item" to="/exercices/creation">Création d'exercices</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="navbar-item" to="/connexion"
              >Connexion</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
