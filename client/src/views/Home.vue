<template>
    <div class="container">
        <div class="row pt-2 pb-2">
            <div class="col-xl-12">
                <SearchInput/>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <ProductsTable/>
            </div>
        </div>
    </div>
</template>

<script>
  import SearchInput from "@/components/SearchInput";
  import ProductsTable from "@/components/ProductsTable";

  export default {
    name: 'Home',
    components: {
      ProductsTable,
      SearchInput,
    }
  }
</script>
