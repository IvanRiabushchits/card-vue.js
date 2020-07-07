<template>
    <div class="table-wrapper">
        <table class="content-table">
            <thead class="content-table__head">
            <tr class="active-row content-table__head-row">
                <th class='content-table__head-cell'>№</th>
                <th class='content-table__head-cell'>Card Holder</th>
                <th class='content-table__head-cell'>Last 4 Digits</th>
                <th class='content-table__head-cell'>Date of Expire</th>
            </tr>
            </thead>
            <tbody class="content-table__data">
            <tr v-for="(item, index) in bankCardsList" :key="index"
                class="content-table__data-row content-table__data-row--active">
                <td class='content-table__data-cell'>
                    {{index + 1}}
                </td>
                <td class='content-table__data-cell'>
                    {{ item.cardName}}
                </td>
                <td class='content-table__data-cell'>
                    {{ item.cardNumber.slice(-4)}}
                </td>
                <td class='content-table__data-cell'>
                    {{ item.cardMonth + '/' + item.cardYear}}
                </td>
            </tr>
            </tbody>
        </table>
        <router-link to="/cardForm">
            <button class="content-table__button link-to-form">
                Add Your Data
            </button>
        </router-link>
    </div>
</template>

<script>

    export default {
        name: "CardDataTable",
        data() {
            return {
                bankCardsList: []
            }
        },
        computed: {

        },
        methods: {
            loadPreviousCards() {
                let bankCard = JSON.parse(localStorage.getItem('bank-card-info'))
                this.bankCardsList = this.bankCardsList.concat(bankCard);
            }
        },
        mounted() {
            this.loadPreviousCards()
        }
    }
</script>


