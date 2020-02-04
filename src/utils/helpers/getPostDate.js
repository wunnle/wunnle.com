import dayjs from 'dayjs'

function getPostDate(dateString) {
  const date = new Date(dateString)

  var delta = Math.round((+new Date() - date) / 1000)

  var minute = 60,
    hour = minute * 60,
    day = hour * 24

  if (delta < day) {
    return 'today'
  } else if (delta < day * 2) {
    return 'yesterday'
  } else if (delta < day * 7) {
    return `${dayjs(dateString).format('dddd')}`
  }

  return dayjs(dateString).format(
    dayjs().isSame(dateString, 'year') ? 'MMM DD' : 'MMM DD, YYYY'
  )
}

export default getPostDate
