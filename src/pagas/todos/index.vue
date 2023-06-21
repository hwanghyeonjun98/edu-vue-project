<template>
	<h1>ToDo List</h1>
	<hr />
	<input type="text" id="search" name="name" v-model="searchText" className="form-control" placeholder="Search" @keyup.enter="searchTodo">
	<hr />
	<TodoFrom @add-todo="addTodo" />
	<div v-if="error">
		{{ error }}
	</div>
	<div v-if="!todos.length" className="text-center">
		검색된 결과가 없습니다.
	</div>
	<TodoItems :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
	<PagingCmop :currentPage="currentPage" :numberOfPage="numberOfPage" :todos="todos" @get-todos="getTodos" />
</template>

<script>
import { computed, ref, watch } from "vue";
import TodoFrom from "@/components/TodoFrom.vue";
import TodoItems from "@/components/TodoItems.vue";
import PagingCmop from "@/components/PagingCmop.vue";
import axios from "axios";

export default {
	components: {
		TodoFrom,
		TodoItems,
		PagingCmop,
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

		const getTodos = async (page = currentPage.value) => {
			error.value = "";
			try {
				const res = await axios.get(`http://localhost:3001/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limt}`);
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
				await axios.post("http://localhost:3001/todos", {
					subject  : todo.subject,
					complated: todo.complated,
				});

				await getTodos(1);
				// todos.value.push(res.data);
			} catch (err) {
				console.log(err);
				error.value = "Something went wrong.";
			}
		};

		const deleteTodo = async (idx) => {
			const id = todos.value[idx].id;
			error.value = "";

			try {
				await axios.delete("http://localhost:3001/todos/" + id);

				await getTodos(currentPage.value);
				// todos.value.splice(idx, 1);
			} catch (err) {
				console.log(err);
			}
		};

		const toggleTodo = async (idx, checked) => {
			const id = todos.value[idx].id;

			try {
				await axios.patch("http://localhost:3001/todos/" + id, {
					complated: checked,
				});
				todos.value[idx].complated = checked;
			} catch (err) {
				console.log(err);
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