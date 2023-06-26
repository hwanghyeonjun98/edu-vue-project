<template>
	<div v-if="loading">
		loading...
	</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<!--	<Input subject="todo.subject" :error="subjectError" label="subject" @update-subject="updateTodoSubject" />-->
				<Input v-model:subject="todo.subject" :error="subjectError" label="subject" />
			</div>
			<div class="col-6" v-if="editing">
				<div class="form-group">
					<label class="text-capitalize">Status</label>
					<div>
						<button type="button" class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" @click="toggleTodoStatues">
							{{ todo.completed ? "Coompleted" : "Incompeleted" }}
						</button>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label class="text-capitalize" for="todoBody">Body</label>
					<textarea id="todoBody" name="todoBody" class="form-control" v-model="todo.body" cols="30" rows="10"></textarea>
				</div>
			</div>
		</div>

		<div>
			<button type="submit" class="btn btn-primary" :disabled="todoUpdate">{{ editing ? "Update" : "Create" }}</button>
			<button type="button" class="ml-2 btn btn-outline-dark" @click="moveToTodoListPage">Cancel</button>
		</div>
	</form>
</template>

<script>
import Input from "@/components/Input.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "@/pagas/composables/toast";
import axios from "@/axios";
import _ from "lodash";

export default {
	components : {
		Input,
	},
	props      : {
		editing : {
			type    : Boolean,
			default : false,
		},
	},
	setup(props) {
		const route = useRoute();
		const router = useRouter();
		const todo = ref({
			subject   : "",
			completed : false,
			body      : "",
		});
		const originalTodo = ref(null);
		const todoId = route.params.id;
		const loading = ref(false);

		const subjectError = ref("");

		const {toastMessage, toastAlertType, isShowToast, showToast} = useToast();

		/*const updateTodoSubject = (newValue) => {
			todo.value.subject = newValue;
		};*/

		const getTodo = async () => {
			loading.value = true;

			try {
				const res = await axios.get(`todos/${todoId}`);

				todo.value = {...res.data};
				originalTodo.value = {...res.data};
				loading.value = false;
			} catch (err) {
				loading.value = false;
				showToast("Something went wrong", "danger");
			}
		};

		if (props.editing) {
			getTodo();
		}

		const toggleTodoStatues = () => {
			todo.value.completed = !todo.value.completed;
		};

		const moveToTodoListPage = () => {
			router.push({
				name : "Todos",
			});
		};

		const todoUpdate = computed(() => {
			return _.isEqual(todo.value, originalTodo.value);
		});

		const onSave = async () => {
			subjectError.value = "";
			if (todo.value.subject === "") {
				subjectError.value = "Subject id requierd";
				return;
			}

			try {
				let res;
				const data = {
					subject   : todo.value.subject,
					completed : todo.value.completed,
					body      : todo.value.body,
				};

				if (props.editing) {
					res = await axios.put(`todos/${todoId}`, data);

					originalTodo.value = {...res.data};
				} else {
					await axios.post("todos", data);

					todo.value.subject = "";
					todo.value.body = "";
				}

				showToast(`${props.editing ? "Update" : "Create"} Todo!`);

				if (!props.editing) {
					await router.push({name : "Todos"});
				}
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
			subjectError,
			// updateTodoSubject,
		};
	},
};
</script>

<style scoped>
</style>