<template>
    <div class="table-wrapper">
        <table class="content-table">
            <thead>
            <tr class="active-row">
                <th>№</th>
                <th>Card Holder</th>
                <th>Last 4 Digits</th>
                <th>Date of Expire</th>
                <th>Card Type</th>
            </tr>
            </thead>
            <tbody>
            <tr class="active-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr class="active-row">
                <td>2</td>
                <td>Sally</td>
                <td>72,400</td>
                <td>Students</td>
                <td>dcode</td>
            </tr>
            </tbody>
        </table>
        <router-link to="/cardForm">
            <button class="link-to-form">
                Add Your Data
            </button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "CardDataTable"
    }
</script>


