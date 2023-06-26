<template>
	<div>
		<div class="d-flex justify-content-between align-items-center">
			<h1>ToDo List</h1>
			<button type="button" class="btn btn-primary" @click="moveToCreate">Create</button>
		</div>
		<hr />
		<input type="text" id="search" name="name" class="form-control" v-model="searchText" placeholder="Search" @keyup.enter="searchTodo">
		<hr />
		<div v-if="error">
			{{ error }}
		</div>
		<div class="text-center" v-if="!todos.length">
			검색된 결과가 없습니다.
		</div>
		<TodoItems :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
		<Paging v-if="todos.length" :currentPage="currentPage" :numberOfPage="numberOfPage" :todos="todos" @get-todos="getTodos" />
	</div>
</template>

<script>
import { computed, ref, watch } from "vue";
import TodoItems from "@/components/TodoItems";
import Paging from "@/components/Paging.vue";
import axios from "@/axios";
import { useToast } from "@/pagas/composables/toast";
import router from "@/router";

export default {
	components : {
		TodoItems,
		Paging,
	},
	setup() {
		const searchText = ref("");
		const todos = ref([]);
		const error = ref("");

		const limt = 5;
		const currentPage = ref(1);
		const numberOfTodos = ref(0);

		const numberOfPage = computed(() => {
			return Math.ceil(numberOfTodos.value / limt);
		});

		const {toastMessage, toastAlertType, isShowToast, showToast} = useToast();

		// const showToast = (message, type) => {
		// 	toastMessage.value = message;
		// 	toastAlertType.value = type;
		// 	isShowToast.value = true;
		//
		// 	setTimeout(() => {
		// 		toastMessage.value = "";
		// 		toastAlertType.value = "";
		// 		isShowToast.value = false;
		// 	}, 5000);
		// };

		const getTodos = async (page = currentPage.value) => {
			error.value = "";

			try {
				const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limt}`);
				todos.value = res.data;
				currentPage.value = page;
				numberOfTodos.value = res.headers["x-total-count"];
			} catch (err) {
				console.log(err);
			}
		};

		getTodos();

		const addTodo = async (todo) => {
			error.value = "";
			// 데이터 베이스 todo 저장
			try {
				await axios.post("todos", {
					subject   : todo.subject,
					completed : todo.completed,
				});

				await getTodos(1);
				// todos.value.push(res.data);
			} catch (err) {
				console.log(err);
				error.value = "Something went wrong.";
				showToast("Something went wrong", "danger");
			}
		};

		const deleteTodo = async (id) => {
			error.value = "";

			try {
				await axios.delete("todos/" + id);

				await getTodos(currentPage.value);
				// todos.value.splice(idx, 1);
			} catch (err) {
				console.log(err);
			}
		};

		const toggleTodo = async (idx, checked) => {
			const id = todos.value[idx].id;

			try {
				await axios.patch("todos/" + id, {
					completed : checked,
				});
				todos.value[idx].completed = checked;
			} catch (err) {
				console.log(err);
				showToast("Something went wrong", "danger");
			}
		};

		/*const filteredTdods = computed(() => {
			if (searchText.value) {
				return todos.value.filter((todo) => {
					return todo.subject.includes(searchText.value);
				});
			}

			return todos.value;
		});*/

		let timeout = null;
		const searchTodo = () => {
			clearTimeout(timeout);
			getTodos(1);
		};
		watch(searchText, () => {
			clearTimeout(timeout);

			setTimeout(() => {
				getTodos(1);
			}, 2000);
		});

		const moveToCreate = () => {
			router.push({
				name : "TodoCreate",
			});
		};

		return {
			todos,
			getTodos,
			addTodo,
			deleteTodo,
			toggleTodo,
			searchText,
			// filteredTdods,
			error,
			numberOfPage,
			currentPage,
			searchTodo,
			showToast,
			toastMessage,
			toastAlertType,
			isShowToast,
			moveToCreate,
		};
	},
};
</script>

<style>
label,
input[type=radio],
input[type=checkbox] {
	cursor: pointer;
}
</style>