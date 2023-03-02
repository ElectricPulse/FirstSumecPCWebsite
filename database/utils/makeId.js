module.exports=function makeId(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	for(let i = 0; i < characters.length; ++i){
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}

	return result
}
