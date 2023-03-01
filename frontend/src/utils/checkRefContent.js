function main(refs) {
	for(const ref of refs) {
		if(ref.current === undefined || ref.current.value.trim() === '')
			return false
	}
	return true
}

export default main
