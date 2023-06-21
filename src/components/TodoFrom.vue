<template>
	<form class=" mb-4" name="asd" action="#" @submit.prevent="onSubmit">
		<div class="d-flex">
			<div class="flex-grow-1 mr-2">
				<input type="text" id="name" class="form-control" name="name" v-model="todo" placeholder="Type new To-Do">
			</div>
			<div>
				<button class="btn btn-primary">Add</button>
			</div>
		</div>
		<div v-show="hasError" style="color: red">This field cannt not</div>
	</form>
</template>

<script>
import { ref } from "vue";

export default {
	emits: [
		"add-todo",
	],
	setup(props, {emit}) {
		let todo = ref("");
		const hasError = ref(false);

		const onSubmit = () => {
			if (todo.value !== "") {
				emit("add-todo", {
					id       : Date.now(),
					subject  : todo.value,
					complated: false,
				});

				todo.value = "";
				hasError.value = false;
			} else {
				hasError.value = true;
			}
		};

		/*const enterSubmit = (e) => {
			if (e.keyCode === 13) {
				onSubmit();
			}
		};*/

		return {
			todo,
			hasError,
			onSubmit,
			// enterSubmit,
		};
	},
};
</script>

<style>

</style>