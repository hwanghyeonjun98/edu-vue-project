<template>
	<div class="name">{{ name }}</div>
	<button class="btn btn-primary" v-on:click="updateName">click</button>
</template>

<script>
import { ref } from "vue";

export default {
	setup() {
		let name = ref({id: 1});

		const updateName = () => {
			name.value.id = 2;
		};

		/*const greeting = (name) => {
			return "hello " + name;
		};
		*/
		return {
			name,
			updateName,
			// greeting,
		};
	},
};
</script>

<style>
.name {
	color: deepskyblue;
}
</style>