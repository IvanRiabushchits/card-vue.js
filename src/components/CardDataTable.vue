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
            <button class="link-to-form">
                Add Your Data
            </button>
    </div>
</template>

<script>
    export default {
        name: "CardDataTable"
    }
</script>

<style scoped lang="scss">
    .table-wrapper {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    .content-table {
        min-width: 400px;
        margin-top: 20%;
        margin-bottom: 20px;

        border-collapse: collapse;

        font-size: 16px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    }

    .content-table thead tr {
        background-color: #2364d2;
        color: #ffffff;
        text-align: left;
        font-weight: bold;
    }

    .content-table th,
    .content-table td {
        padding: 12px 15px;
    }

    .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .content-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .content-table tbody tr:last-of-type {
        border-bottom: 2px solid #2364d2;
    }

    .content-table tbody tr.active-row:hover {
        font-weight: bold;
        color: #009879;
    }

    .link-to-form {
        width: 165px;
        height: 55px;

        margin: 0 auto;

        font-size: 22px;
        font-weight: 500;
        font-family: $font-stack;
        color: #fff;

        background: #2364d2;
        border: none;
        border-radius: 5px;
        box-shadow: 3px 10px 20px 0 rgba(35, 100, 210, 0.3);

        cursor: pointer;
    }

</style>