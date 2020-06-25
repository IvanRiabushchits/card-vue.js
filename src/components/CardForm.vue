<template>
    <div>
        <div class="form-wrapper">
            <div class="card-form">
                <div class="card-form__item">
                    <label class="card-form__item-label" for="cardNumber">Card Number</label>
                    <input class="card-form__item-input" oninput="this.value = value.replace(/\D/g, '')" id="cardNumber"  data-card-field

                           autocomplete="off"
                           maxlength="16">
                </div>
                <div class="card-form__item">
                    <label class="card-form__item-label" for="cardHolder">Card Holders</label>
                    <input class="card-form__item-input" type='text' id="cardHolder" v-letter-only>
                </div>
                <div class="card-form__row">
                    <div class="card-form__col-date">
                        <div class="card-form__group">
                            <label class='card-form__item-label' for="cardMonth">Expiration Date</label>
                            <select id="cardMonth" class="card-form__item-input">
                                <option value="" selected disabled>Month</option>
                                <option
                                        v-for="n in 12"
                                        v-bind:value="n < 10 ? '0' + n : n"
                                        v-bind:key="n">
                                    {{generateMonthValue(n)}}
                                </option>
                            </select>
                            <select id="cardYear" class="card-form__item-input">
                                <option selected disabled>Year</option>
                                <option v-bind:value="$index + minCardYear"
                                        v-for="(n, $index) in 12"
                                        v-bind:key="n">
                                    {{ $index + cardYear }}
                                </option>
                            </select>

                        </div>
                    </div>
                    <div class="card-form__col-CVV">
                        <div class="card-form__item">
                            <label class='card-form__item-label' for="cardCVV">CVV</label>
                            <input class="card-form__item-input" type="text" id="cardCVV" maxlength="4"
                                   v-number-only
                                   @input="changeCvv">
                        </div>
                    </div>
                </div>
                <button class="card-form__button">
                    Submit
                </button>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "CardForm",
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
            backgroundImage: [String, Object],
            randomBackgrounds: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                fields: {
                    cardNumber: 'v-card-number',
                    cardCvv: 'v-card-cvv'
                },
                cardYear: new Date().getFullYear()
            }

        },
        methods: {
            generateMonthValue(n) {
                return n < 10 ? `0${n}` : n
            },
            changeNumber(e) {
                this.formData.cardNumber = e.target.value;
                this.formData.cardNumber.replace(/\d/g, '');
                // regular cc number, 16 digits

                this.$emit('input-card-number', this.formData.cardNumber)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .form-wrapper {
        display: flex;

        width: 100%;
        padding: 50px 15px;
    }

    .card-form {
        display: flex;
        flex-direction: column;

        max-width: 570px;
        width: 100%;
        margin: auto;
        padding: 35px;
        @media screen and (max-width: 576px) {
            margin: 0 auto;
        }
        /*padding-top: 180px; // Отсуп для карточки*/
        @media screen and (max-width: 520px) {
            padding: 25px;
            /*padding-top: 165px; // Отсуп для карточки */
        }
        @media screen and (max-width: 360px) {
            padding: 15px;
            /*padding-top: 165px; // Отсуп для карточки */
        }
        background: #fff;
        border-radius: 10px;
    }

    .card-form__item {
        display: flex;
        flex-direction: column;

        margin-bottom: 20px;
    }

    .card-form__item-label {
        width: 100%;
        margin-bottom: 5px;

        font-size: 14px;
        font-weight: 500;
        color: $font-color;
    }

    .card-form__item-input {
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
                align-items: flex-start;

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