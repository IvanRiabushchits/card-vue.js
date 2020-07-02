<template>
    <div id="app" class="form-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>


    export default {
        name: 'App',
        components: {
        },
        methods: {
            // persistCardData() {
            //   const parsed = JSON.stringify(this.formData)
            //   localStorage.setItem('bank-card-info', parsed)
            //   this.formData = '';
            // }
        }
    }
</script>
