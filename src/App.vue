<template>
    <div id="app" class="form-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!--    <CardForm />-->
        <!--    <CardDataTable />-->
    </div>
</template>

<script>
    // import CardForm from "@/components/CardForm";
    // import CardDataTable from "@/components/CardDataTable";


    export default {
        name: 'App',
        components: {
            // CardDataTable
            // CardForm
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

<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap");

    body {
        height: 100%;
        background: #ddeefc;
        font-family: $font-stack;
        font-size: 16px;
    }

    * {
        box-sizing: border-box;

        &:focus {
            outline: none;
        }
    }

    #app {
        min-height: 100vh;
        display: flex;
        padding: 50px 15px;
        @media screen and (max-width: 700px), (max-height: 500px) {
            flex-wrap: wrap;
            flex-direction: column;
        }
    }

</style>
