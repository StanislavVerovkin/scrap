<template>
    <section>
        <Loader/>
        <b-table
                v-if="products.data.list.length !== 0"
                :data="products.data.list"
                :total="products.data.total"
                :per-page="20"
                paginated
                backend-pagination
                @page-change="onPageChange"
        >
            <template slot-scope="props">
                <b-table-column field="image" label="Image">
                    <img :src="props.row.image"/>
                </b-table-column>
                <b-table-column field="title" label="Title" width="200">
                    <router-link :to="`/offers${props.row.offersUrl}`">
                        {{ props.row.title }}
                    </router-link>
                </b-table-column>
                <b-table-column field="price" label="Middle Price" sortable>
                    {{ props.row.price }}
                </b-table-column>
                <b-table-column field="priceDiapason" label="Price Diapason" sortable>
                    {{ props.row.priceDiapason }}
                </b-table-column>
                <b-table-column field="description" label="Description" width="400">
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
</template>

<script>
  import Loader from "./Loader";

  export default {
    components: { Loader },
    methods: {
      onPageChange ( page ) {
        const request = { page, query: this.products.query };
        this.$store.dispatch( 'setProducts', request );
      },
    },
    computed: {
      products () {
        return this.$store.getters.products;
      }
    }
  }
</script>

<style lang="scss" scoped>
    img {
        width: 120px;
    }

    .b-table {
        font-size: 14px;
    }
</style>