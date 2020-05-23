<template>
    <b-loading :is-full-page="true" :active="loading"></b-loading>
</template>

<script>
  export default {
    name: "Loader",
    computed: {
      loading () {
        return this.$store.getters.loading;
      }
    }
  }
</script>