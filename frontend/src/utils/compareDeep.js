export default function compareDeep(object1, object2) {
	return 	JSON.stringify(object1) === JSON.stringify(object2)
}
