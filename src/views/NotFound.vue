<template>
  <main>
    <div>
      <h2>We couldn’t find the page you are looking for</h2>
      <p>But we have millions more shopping items for you to browse!</p>
      <router-link to="/">Go to Homepage</router-link>
      <div>
        <img src="@/assets/images/undraw_page_not_found.svg"/>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    heading: String,
    text: String
  }
}
</script>
  
<style scoped>
  main {
    padding: 50px 10px;
  }
  main > div {
    text-align: center;
  }

  main h2 {
    padding: 16px;
  }

  main p {
    margin: 5px;
  }

  main a {
    display: inline-block;
    margin: 10px;
    padding: 10px;
    color: #243a6f;
    border: 1px solid #243a6f;
    text-transform: uppercase;
  }


  main img {
    width: 350px;
    height: 350px;
  }
</style>
