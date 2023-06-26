<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link class="navbar-brand" :to="{name:'Home'}">JJUN</router-link>

		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<router-link class="nav-link" :to="{name:'Todos'}">Todos</router-link>
			</li>
		</ul>
	</nav>
	<div class="container">
		<router-view />
	</div>
	<ToastMessage v-if="isShowToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import ToastMessage from "@/components/ToastMessage";
import { useToast } from "@/pagas/composables/toast";

export default {
	components : {
		ToastMessage,
	},
	setup() {
		const {toastMessage, toastAlertType, isShowToast, showToast} = useToast();

		return {
			toastMessage,
			toastAlertType,
			isShowToast,
			showToast,
		};
	},
};
</script>

<style>
*:not(input, textarea, select, option) {
	text-transform: capitalize;
}
</style>