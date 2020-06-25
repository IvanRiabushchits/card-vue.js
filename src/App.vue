<template>
  <div id="app">
    <CardForm />
  </div>


</template>

<script>
import CardForm from "@/components/CardForm";

export default {
  name: 'App',
  components: {
    CardForm
  }
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap");

body {
  background: #ddeefc;
  font-family: $font-stack;
  font-size: 16px;
}
* {
  box-sizing: border-box;
  &:focus {
   outline: none;
  }
}

</style>
