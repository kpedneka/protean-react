export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if ( serializedState === null ) {
			return undefined;
		}
		console.log("FOUND STATE IN localStorage")
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}


export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.log('err in storing application state: ', err);
	}
}