const quoteCon = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const time = document.getElementById('time');
const timezone = document.getElementById('timezone');
const city = document.getElementById('city');
const country = document.getElementById('country');
const refresh = document.getElementById('refresh');
const morning = document.getElementById('morning');
const evening = document.getElementById('evening');
const greeting = document.getElementById('greeting');
const bodyContainer = document.getElementById('body-container');
const more = document.getElementById('more');
const currentTimezone = document.getElementById('current-timezone');
const days = document.getElementById('days');
const weekDay = document.getElementById('week-day');
const weekNum = document.getElementById('week-number');
const timeSection = document.getElementById('time-section');


async function getRandomQuote(){
await fetch('https://api.quotable.io/random')
	.then(response => response.json())
	.then((data) =>{
		quote.innerHTML = '"' + data.content + '"';
		author.innerHTML = data.author;
	})
}

getRandomQuote();

async function updateTime(){
	await fetch("https://worldtimeapi.org/api/ip")
	.then(response => response.json())
	.then((data) =>{
		const date = new Date(data.datetime);
		const hour = date.getHours();
			if(hour < 12){
			greeting.innerHTML =  'MORNING,';
			evening.style.display = 'none';
			morning.style.display = 'block';
			currentTimezone.innerHTML = data.timezone;
			days.innerHTML = data.day_of_year;
			weekDay.innerHTML = data.day_of_week;
			weekNum.innerHTML = data.week_number;
		}else if(hour < 18){
			greeting.innerHTML = 'AFTERNOON,';
			evening.style.display = 'none';
			morning.style.display = 'block';
			currentTimezone.innerHTML = data.timezone;
			days.innerHTML = data.day_of_year;
			weekDay.innerHTML = data.day_of_week;
			weekNum.innerHTML = data.week_number;
		}else{
			greeting.innerHTML = 'EVENING,';
			evening.style.display = 'block';
			morning.style.display = 'none';
			bodyContainer.style.background = 'url(./assets/desktop/bg-image-nighttime.jpg)';
			bodyContainer.style.backgroundRepeat = 'no-repeat';
			bodyContainer.style.backgroundPosition = 'center';
			bodyContainer.style.backgroundSize = 'cover';
			currentTimezone.innerHTML = data.timezone;
			days.innerHTML = data.day_of_year;
			weekDay.innerHTML = data.day_of_week;
			weekNum.innerHTML = data.week_number;
			more.classList.add('more-open-night');
		}
		time.innerHTML = date.toLocaleTimeString([], {timeStyle: 'short'});
		timezone.innerHTML = data.abbreviation;
	})
}

updateTime();

const moreBtn = document.getElementById('more-btn').addEventListener('click', (e) => {
more.classList.toggle('more-open');
timeSection.classList.toggle('time-section-open');
quoteCon.style.display = 'none';
if(more.classList.contains('more-open')){
	const moreBtn = document.getElementById('more-btn')
	moreBtn.innerHTML = 'less <svg class="svg-rotate" width="40" height="40" xmlns="https://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#303030" cx="20" cy="20" r="20"/><path stroke="#FFF" stroke-width="2" d="M14 23l6-6 6 6"/></g></svg></button>'
}else{
	const moreBtn = document.getElementById('more-btn');
	quoteCon.style.display = 'block';
	moreBtn.innerHTML = 'more <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#303030" cx="20" cy="20" r="20"/><path stroke="#FFF" stroke-width="2" d="M14 23l6-6 6 6"/></g></svg></button>'
}
})


refresh.addEventListener('click', function(e){
	fetch('https://api.quotable.io/random')
	.then(response => response.json())
	.then((data) =>{
		quote.innerHTML = '"' + data.content + '"';
		author.innerHTML = data.author;
	})
});



