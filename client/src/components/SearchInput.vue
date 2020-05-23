<template>
    <div>
        <section>
            <b-field grouped>
                <b-input v-model="query" placeholder="Search..." expanded></b-input>
                <p class="control">
                    <button @click="search" class="button is-primary">Search</button>
                </p>
            </b-field>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'SearchInput',
    data () {
      return {
        query: '',
        page: 1,
      }
    },
    methods: {
      search () {
        const request = {
          page: this.page,
          query: this.query
        };
        this.$store.dispatch( 'setProducts', request );
        this.$store.dispatch( 'setQuery', request.query );
      }
    }
  }
</script>
