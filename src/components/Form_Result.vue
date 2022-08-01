<script>
    import {mapState} from 'vuex'

    export default {
        name: "Form_Result",
        data() {
            return {
            }
        },
        methods: {
            returnToBack() {
                this.$store.commit('ADD_LINK_TO_DOWNLOAD', null)
            }
        },
        computed: {
            ...mapState(['resultOfTask', 'isLoading', 'percentOfLoading'])
        },
    }
</script>

<template>
	<transition name="fade">
		<div
				v-if="resultOfTask && isLoading === false"
				class="generated"
		>
			<p class="generated__header">
				Файл сгенерирован
			</p>

			<p class="generated__subtitle">
				Ресурс: <span style="font-weight: 700">{{resultOfTask.url}}</span>
			</p>

			<div class="generated__links">
				<button
						@click="returnToBack"
						class="btn-user btn_back"
				>
					На главную
				</button>
				<a
						:href="'https://api.sitemap-generator.ru/sitemap/' + resultOfTask.sitemap"
						class="btn-user btn-user_revers"
						download
				>
					Скачать XML
				</a>
			</div>
		</div>
	</transition>
</template>

<style scoped lang="scss">
	@import "~@/assets/scss/CommonStylesheet";

	.generated {
		display: flex;
		align-content: center;
		flex-direction: column;

		margin: 0 auto;

		max-width: 550px;

		&__header {
			margin-bottom: 10px;

			color: #f60;
			font-size: 32px;
			font-weight: 600;
		}

		&__subtitle {
			margin-bottom: 35px;

			color: rgba(255, 255, 255, .9);
			font-weight: 500;
		}

		&__links {
			.btn_back {
				margin-right: 15px;
			}
		}
	}

</style>