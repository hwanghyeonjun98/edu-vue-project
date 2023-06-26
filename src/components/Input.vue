<template>
	<div class="form-group">
		<label for="">{{ label }}</label>
		<input type="text" id="" name="" class="form-control" :value="subject" @input="onInput">
		<div class="text-red" v-if="{error}">
			{{ error }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label  : {
			type   : String,
			require: true,
		},
		error  : {
			type   : String,
			require: true,
		},
		subject: {
			type   : String,
			require: true,
		},
	},
	setup(props, {emit}) {
		const onInput = (e) => {
			emit("update:subject", e.target.value);
		};

		return {
			onInput,
		};
	},
};
</script>

<style scoped>
.text-red {
	color: red;
}
</style>