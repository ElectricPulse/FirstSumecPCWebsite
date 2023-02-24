function getTimeDifference(date)  {
	const current = new Date()
	const noteDate = new Date(date)
	const diffTime = current - noteDate
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	return diffDays
}

export default getTimeDifference
