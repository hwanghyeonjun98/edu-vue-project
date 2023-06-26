<template>
	<Navbar />
	<div class="container">
		<router-view />
	</div>
	<ToastMessage />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ToastMessage from "@/components/ToastMessage";

export default {
	components : {
		Navbar,
		ToastMessage,
	},
	setup() {
	},
};
</script>

<style>
button {
	text-transform: capitalize;
}
</style>