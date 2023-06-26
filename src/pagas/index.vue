<template>
	<div>Home</div>
	{{ count }}
	<button type="button" @click="count++">add</button>
</template>

<script>
import { useCount } from "@/pagas/composables/conut";

export default {
	setup() {
		const {count} = useCount();
		console.log(count);
		return {
			count,
		};
	},
};
</script>

<style scoped>

</style>