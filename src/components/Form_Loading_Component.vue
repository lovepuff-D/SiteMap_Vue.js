<script>
    import {mapState} from 'vuex'
    import gsap from 'gsap'

    export default {
        name: "Form_Loading_Component",
		data() {
            return {
                percentOfLoadingLocal: '',
                tweenedPercent: 0,
            }
		},
        computed: {
            ...mapState(['isLoading', 'percentOfLoading'])
        },
        watch: {
            '$store.state.percentOfLoading': {
                handler(newValue, oldValue) {
                    //console.log(newValue, oldValue)
                    if (newValue < oldValue) return
                    this.percentOfLoadingLocal = this.percentOfLoading
                },
            },
            'percentOfLoadingLocal': {
                handler(newValue, oldValue) {
                    gsap.to(this, { duration: 1, tweenedPercent: Number(newValue) || 0 })
                },
            }
        }
    }
</script>

<template>
	<transition name="fade">

		<div
				class="loading col"
				v-if="isLoading"
		>
			<div>
				<div class="loading__header">
					Файл генерируется
				</div>
			</div>

			<span class="loading__percent">
				{{tweenedPercent.toFixed(0) + '%'}}
			</span>

			<div class="loading__bar col">
				<div class="bar">
					<div
							:style="{width: tweenedPercent.toFixed(0) + '%'}"
							class="bar__strip"
					>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped lang="scss">

	.loading {
		display: flex;
		align-content: center;
		flex-direction: column;

		margin: 0 auto;

		max-width: 550px;

		&__header {
			font-size: 32px;
			font-weight: 700;
		}

		&__percent {
			font-size: 32px;
			font-weight: 700;
		}

		&__bar {
			width: 100%;
			max-width: 550px;
			height: 35px;

			margin-top: 15px;

			border: 2px solid white;

			.bar {
				height: 100%;

				&__strip {
					height: 100%;
					width: 15px;
					background-color: red;
				}
			}
		}
	}

</style>