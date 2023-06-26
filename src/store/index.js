import { createStore } from "vuex";

export default createStore({
	state : {
		toastMessage   : "",
		toastAlertType : "",
		isShowToast    : false,
		timeout        : null,
	},
});