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
            <router-link to="">
            <button @click="persistCardData" class="card-form__button">
                Save
            </button>
            </router-link>
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

            },
            persistCardData() {
                const parsed = JSON.stringify(this.formData)
                localStorage.setItem('bank-card-info', parsed)
                this.formData = '';
                alert("Ваши данные сохранены")
            }

        }
    }
</script>
