<script>
    import FormSiteMap from "@/components/Form_Inputs";
    import FormLoading from "@/components/Form_Loading_Component";
    import FormResult from "@/components/Form_Result";

    export default {
        name: "Main",
        components: {
            FormSiteMap,
            FormLoading,
            FormResult,
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        mounted() {
        }
    }
</script>

<template>
	<div class="wrapper">
		<div class="wrapper_bg">
			<div class="content">
				<header>
					<div class="header__title">
						Генератор SITEMAP
					</div>
				</header>

				<main>
					<div class="container">
						<FormSiteMap></FormSiteMap>
						<FormLoading></FormLoading>
						<FormResult></FormResult>
					</div>
				</main>
			</div>
		</div>
	</div>

</template>

<style scoped lang="scss">

	.wrapper {
		position: relative;

		height: 100vh;

		padding-top: 50px;

		background: url("~@/assets/bg.jpg");
		background-size: contain;

		&::after {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: black;
			opacity: .7;
		}
	}

	.content {
		position: relative;
		z-index: 5;
	}

	.container {
		max-width: 1280px;
		padding: 0 15px;
		margin: 0 auto;
	}

	header {
		.header__title {
			margin-bottom: 100px;

			font-size: 32px;
			font-weight: 700;
		}
	}

	main {
	}

</style>