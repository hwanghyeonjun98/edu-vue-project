<template>
	<div class="form-group">
		<label class="text-capitalize" :for="label">{{ label }}</label>
		<input type="text" class="form-control" :id="label" :name="label" :value="subject" @input="onInput">
		<div class="text-red" v-if="{error}">
			{{ error }}
		</div>
	</div>
</template>

<script>
export default {
	props : {
		label   : {
			type    : String,
			require : true,
		},
		error   : {
			type    : String,
			require : true,
		},
		subject : {
			type    : String,
			require : true,
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