<template>
    <div class="form-content">
        <div class="card-wrapper">
            <Card
                    :fields="fields"
                    :labels="formData"
                    :isCardNumberMasked="isCardNumberMasked"
            />
        </div>
        <div class="card-form">
            <div class="card-form__field">
                <label class="card-form__field-label" for="fields.cardNumber">Card Number</label>
                <input
                        id="fields.cardNumber"
                        class="card-form__field-input"
                        @input="changeNumber"
                        v-model="formData.cardNumber"
                        maxlength="19"
                >
            </div>
            <div class="card-form__field">
                <label class="card-form__field-label" for="cardHolder">Card Holders</label>
                <input class="card-form__field-input" type='text' id="cardHolder" v-model="formData.cardName"
                       v-letter-only>
            </div>
            <div class="card-form__row">
                <div class="card-form__col-date">
                    <div class="card-form__group">
                        <label class='card-form__field-label' for="cardMonth">Expiration Date</label>
                        <select id="cardMonth" class="card-form__field-input" v-model="formData.cardMonth">
                            <option value="" selected disabled>Month</option>
                            <option
                                    v-for="n in 12"
                                    v-bind:value="n < 10 ? '0' + n : n"
                                    v-bind:key="n">
                                {{generateMonthValue(n)}}
                            </option>
                        </select>
                        <label style="display: none" for="cardYear"></label>
                        <select id="cardYear" class="card-form__field-input" v-model="formData.cardYear"
                                data-card-field>
                            <option value="" selected disabled>Year</option>
                            <option v-bind:value="index + minCardYear" v-for="(n, index) in 5" v-bind:key="n">
                                {{index + minCardYear}}
                            </option>
                        </select>

                    </div>
                </div>
                <div class="card-form__col-CVV">
                    <div class="card-form__field">
                        <label class='card-form__field-label' for="cardCVV" data-card-field>CVV</label>
                        <input class="card-form__field-input"
                               v-model="formData.cardCvv"
                               type="text"

                               id="cardCVV" maxlength="4"
                               v-number-only
                        >
                    </div>
                </div>
            </div>
            <!--            @click="persistCardData"-->
            <button class="card-form__button">
                Save
            </button>
        </div>

    </div>
</template>

<script>
    import Card from "@/components/Card";

    export default {
        name: 'CardForm',
        components: {
            Card
        },
        directives: {
            'number-only': {
                bind(el) {
                    function checkValue(event) {
                        event.target.value = event.target.value.replace(/[^0-9]/g, '')
                        if (event.charCode >= 48 && event.charCode <= 57) {
                            return true
                        }
                        event.preventDefault()
                    }

                    el.addEventListener('keypress', checkValue)
                }
            },
            'letter-only': {
                bind(el) {
                    function checkValue(event) {
                        if (event.charCode >= 48 && event.charCode <= 57) {
                            event.preventDefault()
                        }
                        return true
                    }

                    el.addEventListener('keypress', checkValue)
                }
            }
        },
        props: {
            formData: {
                type: Object,
                default: () => {
                    return {
                        cardName: '',
                        cardNumber: '',
                        cardMonth: '',
                        cardYear: '',
                        cardCvv: ''
                    }
                }
            },
        },
        data() {
            return {
                fields: {
                    cardNumber: '',
                    cardName: '',
                    cardMonth: '',
                    cardYear: '',
                    cardCvv: ''
                },
                isCardFlipped: false,
                isCardNumberMasked: true,
                minCardYear: new Date().getFullYear()
            }
        },

        methods: {
            generateMonthValue(n) {
                return n < 10 ? `0${n}` : n
            },

            changeNumber(e) {
                this.formData.cardNumber = e.target.value
                let noDigits = this.formData.cardNumber.replace(/\D/g, '')
                this.formData.cardNumber = noDigits.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')

            }
            // persistCardData() {
            //     const parsed = JSON.stringify(this.formData)
            //     localStorage.setItem('bank-card-info', parsed)
            //     this.formData = '';
            // }

        }
    }
</script>

<style lang="scss">

    .form-content {
        max-width: 570px;
        width: 100%;
        margin: auto;
    }

    .card-wrapper {
        margin-bottom: -130px;
    }

    .card-form {
        display: flex;
        flex-direction: column;

        padding: 35px;
        @media screen and (max-width: 576px) {
            margin: 0 auto;
        }
        padding-top: 180px; // Отступ для карточки
        @media screen and (max-width: 520px) {
            padding: 25px;
            padding-top: 165px; // Отступ для карточки
        }
        @media screen and (max-width: 360px) {
            padding: 15px;
            padding-top: 165px; // Отступ для карточки
        }
        background: #ffffff;
        border-radius: 10px;
    }

    .card-form__field {
        display: flex;
        flex-direction: column;

        margin-bottom: 20px;
    }

    .card-form__field-label {
        width: 100%;
        margin-bottom: 5px;

        font-size: 14px;
        font-weight: 500;
        color: $font-color;
    }

    .card-form__field-input {
        height: 50px;

        padding: 5px 15px;

        font-size: 18px;
        color: $font-color;

        border: 1px solid #ced6e0;
        border-radius: 5px;
        background: none;
        box-shadow: none;

        &:hover,
        &:focus {
            border-color: #3d9cff;
        }
    }

    /*Expiration date + CVV*/
    .card-form__row {
        display: flex;
        @media screen and (max-width: 520px) {
            flex-direction: column;
            flex-wrap: wrap;
        }

        .card-form__col-date {
            flex: auto;
            margin-right: 35px;
            @media screen and (max-width: 520px) {
                margin-right: 0;
            }

            .card-form__group {
                display: flex;
                flex-wrap: wrap;

                select {
                    flex-grow: 1;
                    /*max-width: 150px;*/
                }
            }

            select:last-child {
                margin-left: 15px;

            }
        }
    }

    .card-form__col-CVV {
        max-width: 150px;
        @media screen and (max-width: 520px) {
            max-width: initial;
            margin-top: 20px;
        }
    }


    .card-form__button {
        width: 100%;
        height: 55px;

        margin-top: 20px;

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