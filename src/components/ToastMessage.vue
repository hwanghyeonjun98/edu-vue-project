<template>
	<div class="alert alert-primary toast_box" :class="`alert-${type}`">
		{{ message }}
	</div>
</template>

<script>
export default {
	props: {
		message: {
			type   : Storage,
			require: true,
		},
		type   : {
			type   : String,
			default: "success",
		},
	},
};
</script>

<style>
.toast_box {
	position: fixed;
	top: 10px;
	right: 10px;
}
</style>