<template>
    <div>
        <Loader/>
        <div v-if="offers.data.list.length !== 0">
            <Card :data="offers"/>
            <b-table
                    :data="offers.data.list"
                    :paginated="false"
                    :default-sort-direction="'desc'"
                    :sort-icon="'arrow-up'"
                    :sort-icon-size="'is-small'"
                    default-sort="rating"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page"
            >
                <template slot-scope="props">
                    <b-table-column field="storeImage" label="Image">
                        <img :src="props.row.storeImage">
                    </b-table-column>
                    <b-table-column field="title" label="Title">
                        <a :href="props.row.storeUrl" target="_blank">
                            {{ props.row.title}}
                        </a>
                    </b-table-column>
                    <b-table-column field="guarantee" label="Guarantee">
                        {{ props.row.guarantee}}
                    </b-table-column>
                    <b-table-column field="rating" label="Rating" sortable>
                        {{ props.row.rating}}
                    </b-table-column>
                    <b-table-column field="price" label="Price" sortable>
                        {{ props.row.price}} UAH
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
  import Loader from "./Loader";
  import Card from "./Card";

  export default {
    components: { Card, Loader },
    computed: {
      offers () {
        return this.$store.getters.offers;
      },
    }
  }
</script>

<style lang="scss" scoped>
    .b-table {
        font-size: 14px;
    }

    img {
        width: 60px;
    }
</style>