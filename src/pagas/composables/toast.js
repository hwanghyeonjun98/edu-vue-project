import { onUnmounted, ref } from "vue";

export const useToast = () => {
	const toastMessage = ref("");
	const toastAlertType = ref("");
	const isShowToast = ref(false);
	const timeout = ref(null);

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
