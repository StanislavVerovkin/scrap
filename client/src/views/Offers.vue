<template>
    <div class="container">
        <div class="row">
            <div class="col-xl-12">
                <OffersTable/>
            </div>
        </div>
    </div>
</template>

<script>
  import OffersTable from "@/components/OffersTable";

  export default {
    name: "Offers",
    components: {
      OffersTable
    },
    mounted () {
      const id = `${this.$route.params.category}/${this.$route.params.product}`;
      this.$store.dispatch( 'setOffers', id );
    }
  }
</script>