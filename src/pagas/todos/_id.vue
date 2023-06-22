<template>
	<h1>Todo Page</h1>
	<div v-if="loading">
		loading...
	</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<div class="form-group">
					<label for="">Todo Subject</label>
					<input type="text" id="" class="form-control" name="" v-model="todo.subject">
				</div>
			</div>
			<div class="col-6">
				<div class="form-group">
					<label for="">Status</label>
					<div>
						<button type="button" class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" @click="toggleTodoStatues">
							{{ todo.completed ? "Coompleted" : "Incompeleted" }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div>
			<button type="submit" class="btn btn-primary" :disabled="todoUpdate">Save</button>
			<button type="button" class="ml-2 btn btn-outline-dark" @click="moveToTodoListPage">Cancel</button>
		</div>
	</form>
	<ToastMessage v-if="isShowToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import _ from "lodash";
import ToastMessage from "@/components/ToastMessage.vue";
import { useToast } from "@/pagas/composables/toast";

export default {
	components: {
		ToastMessage,
	},
	setup     : function () {
		const route = useRoute();
		const router = useRouter();
		const todo = ref(null);
		const originalTodo = ref(null);
		const todoId = route.params.id;
		const loading = ref(true);
		
		const {toastMessage, toastAlertType, isShowToast, showToast} = useToast();

		const getTodo = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/todos/${todoId}`);

				todo.value = {...res.data};
				originalTodo.value = {...res.data};
				loading.value = false;
			} catch (err) {
				showToast("Something went wrong", "danger");
			}
		};

		getTodo();

		const toggleTodoStatues = () => {
			todo.value.completed = !todo.value.completed;
		};

		const moveToTodoListPage = () => {
			router.push({
				name: "Todos",
			});
		};

		const todoUpdate = computed(() => {
			return _.isEqual(todo.value, originalTodo.value);
		});

		const onSave = async () => {
			try {
				const res = await axios.put(`http://localhost:3001/todos/${todoId}`, {
					subject  : todo.value.subject,
					completed: todo.value.completed,
				});

				originalTodo.value = {...res.data};

				showToast("This Todo Updated!");
			} catch (err) {
				showToast("Something went wrong", "danger");
			}
		};

		return {
			todo,
			loading,
			onSave,
			toggleTodoStatues,
			moveToTodoListPage,
			todoUpdate,
			isShowToast,
			toastMessage,
			toastAlertType,
		};
	},
};
</script>

<style scoped>

</style>