<script>
    import {mapState} from 'vuex'

    export default {
        name: "Form_Sitemap",
		components: {
		},
        data() {
            return {
                fieldUrl: '',
                fieldEmail: '',

				isCorrectUrl: true,
				isShowPopper: true,
            }
        },
        methods: {
            createTask() {
                if (!this.checkValidUrl()) return
                this.$store.dispatch('createTask', {url: this.fieldUrl, email: this.fieldEmail})
            },
            checkValidUrl() {
                let result = /^http:\/\/|^https:\/\//g.test(this.fieldUrl)
				this.isCorrectUrl = result
                return result
            },
            returnToBack() {
                this.$store.commit('ADD_LINK_TO_DOWNLOAD', null)
            }
        },
        computed: {
            ...mapState(['resultOfTask', 'isLoading'])
        },
    }
</script>

<template>
		<transition name="fade">
			<form
					v-if="!resultOfTask && isLoading === false"
					@submit.prevent
					class="form"
			>
				<div class="form__item item">
					<label class="item__body item-body">
						<span class="item-body__header">Адрес Сайта *</span>
						<input
								v-model="fieldUrl"
								class="item-body__input"
								:class="{'error-of-input' : !isCorrectUrl}"
								type="text"
								placeholder="https://site.ru"
						>
					</label>
				</div>
				<div class="form__item item">
					<label class="item__body item-body">
						<span class="item-body__header">Электронная почта</span>
						<input
								v-model="fieldEmail"
								class="item-body__input"
								type="text"
								placeholder="youremail@example.com"
						>
					</label>
				</div>
				<button
						@click="createTask(), checkValidUrl()"
						class="form__btn btn-user"
				>
					Запросить XML
				</button>
			</form>
		</transition>
</template>

<style scoped lang="scss">
	@import "~@/assets/scss/CommonStylesheet";

	.col {
		width: 100%;
	}

	.form {
		display: flex;
		align-content: center;
		flex-direction: column;

		margin: 0 auto;

		max-width: 550px;

		.item {
			width: 100%;
			max-width: 550px;

			&:not(:last-child) {
				margin-bottom: 15px;
			}

			.item-body {

				&__header {
					display: block;
					text-align: left;
					margin-bottom: 10px;
				}

				&__input {
					width: 100%;
					height: 45px;
					padding: 0 15px;

					background-color: black;
					border: 1px solid white;

					transition: border-color .3s;

					color: white;
					font-size: 17px;
					font-weight: 600;

					&:focus {
						border-color: #ff6600;
					}
				}

				.error-of-input {
					border-color: red;
				}
			}
		}
	}
</style>