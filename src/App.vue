<template>
	<router-view/>
</template>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
	@import "assets/scss/Reset_Stylesheet";

	* {
		box-sizing: border-box;
	}

	body {
		overflow: hidden;
		background-color: #2b2b2b;
	}

	#app {
		font-family: 'Montserrat', sans-serif, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: white;
	}

	button {
		font-family: 'Montserrat', sans-serif, Arial, sans-serif;
	}

	nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		position: absolute;
		top: 100%;
		left: 100%;
		opacity: 0;
	}
</style>
