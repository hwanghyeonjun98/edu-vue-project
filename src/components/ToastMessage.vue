<template>
	<div class="toast_box">
		<transition-group name="slide">
			<div class="alert" v-for="toast in toasts" :key="toast.id" :class="`alert-${toast.type}`">
				{{ toast.message }}
			</div>
		</transition-group>
	</div>
</template>

<script>

import { useToast } from "@/pagas/composables/toast";

export default {
	setup() {
		const {toasts} = useToast();

		return {
			toasts,
		};
	},
};
</script>

<style scoped>
.toast_box {
	position: fixed;
	top: 10px;
	right: 10px;
}

.slide-enter-active,
.slide-leave-active {
	transition: all .5s ease;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateX(100px);
}

.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateX(0);
}
</style>