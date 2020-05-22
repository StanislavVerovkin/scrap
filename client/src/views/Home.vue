<template>
    <div class="container">
        <div class="row pt-2 pb-2">
            <div class="col-xl-12">
                <SearchInput/>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <DataTable/>
            </div>
        </div>
    </div>
</template>

<script>
  import DataTable from '@/components/DataTable';
  import SearchInput from "@/components/SearchInput";

  export default {
    name: 'Home',

    components: {
      SearchInput,
      DataTable
    }
  }
</script>
