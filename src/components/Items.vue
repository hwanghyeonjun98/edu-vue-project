<template>
	<div class="card mb-2" v-for="(item, idx) in items" :key="item.id">
		<slot :idx="idx" :item="item"></slot>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type   : Array,
			require: true,
		},
	},
};
</script>

<style scoped>

</style>