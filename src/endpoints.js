const FRONTEND = 'http://localhost:3000';
const BACKEND =
	process.env.NODE_ENV === 'production'
		? 'https://portfolioflobarth.herokuapp.com'
		: 'http://localhost:8000';

export { FRONTEND, BACKEND };
