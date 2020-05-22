<template>
    <div>
        <section>
            <b-table
                    :data="!isEmpty ? [] : products.data.list"
                    :total="products.data.total"
                    :per-page="20"
                    :loading="loading"
                    paginated
                    backend-pagination
                    @page-change="onPageChange"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page"
            >

                <template slot-scope="props">

                    <b-table-column field="image" label="Image">
                        <img :src="props.row.image"/>
                    </b-table-column>

                    <b-table-column field="title" label="Title" width="200">
                        {{ props.row.title }}
                    </b-table-column>

                    <b-table-column field="price" label="Middle Price" sortable>
                        {{ props.row.price }}
                    </b-table-column>

                    <b-table-column field="priceDiapason" label="Price Diapason" sortable>
                        {{ props.row.priceDiapason }}
                    </b-table-column>

                    <b-table-column label="Description" width="400">
                        <div class="description">
                            {{ props.row.description }}
                        </div>
                    </b-table-column>

                </template>
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>No data to display</p>
                        </div>
                    </section>
                </template>
            </b-table>
        </section>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        isEmpty: true,
      }
    },
    computed: {
      products () {
        return this.$store.getters.products;
      },
      loading () {
        return this.$store.getters.loading;
      }
    },
    methods: {
      onPageChange ( page ) {
        const request = { page, query: this.products.query };
        this.$store.dispatch( 'setProducts', request );
      },
    },
  }
</script>

<style lang="scss">
    img {
        width: 120px;
    }

    .description {
        font-size: 14px;
    }
</style>