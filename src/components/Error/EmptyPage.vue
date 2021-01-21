<template>
  <main>
    <div>
      <h2>{{ heading}}</h2>
      <p>{{text}}</p>
      <slot></slot>
      <div>
        <img src="@/assets/images/undraw_empty.svg"/>
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