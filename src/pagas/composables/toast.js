import { computed, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
	const store = useStore();
	const toastMessage = computed(() => store.state.toastMessage);
	const toastAlertType = computed(() => store.state.toastAlertType);
	const isShowToast = computed(() => store.state.isShowToast);
	const timeout = computed(() => store.state.timeout);
	console.log(isShowToast.value);

	const showToast = (message, type = "success") => {
		toastMessage.value = message;
		toastAlertType.value = type;
		isShowToast.value = true;

		timeout.value = setTimeout(() => {
			toastMessage.value = "";
			toastAlertType.value = "";
			isShowToast.value = false;
		}, 5000);
	};

	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		toastMessage,
		toastAlertType,
		isShowToast,
		showToast,
	};
};
