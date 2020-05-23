<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img :src="data.data.productImage"
                     class="card-img">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ data.data.productTitle }}</h5>
                    <p class="card-text">{{ data.data.productDescription }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: [ 'data' ],
    name: "Card"
  }
</script>

<style scoped>
    .card {
        border: none;
        margin-top: 16px;
    }
</style>