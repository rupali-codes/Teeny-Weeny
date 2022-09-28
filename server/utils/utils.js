const signupHTML = `
	<div class="mx-auto my-4 text-white">
		<h1 class="text-center text-decoration-underline">Signup</h1>

		<form class="mt-3 mx-auto" style="width: 13.5em;" method="POST" action="/signup">
			<label for="name" class="form-label mt-2">Name</label>
			<input type="text" name="name" id="name" class="form-control">

			<label for="email" class="form-label mt-2">Email</label>
			<input type="text" name="email" id="name" class="form-control">

			<label for="password" class="form-label mt-2">Password <span class="text-secondary">(min length 6)</span></label>
			<input type="text" name="password" id="password" class="form-control">

			<button class="btn btn-commom rounded mt-4 mx-auto w-100" type="submit">Signup</button>
		</form>
	</div>
`

const loginHTML = `
	<div class="mx-auto my-4 text-white">
		<h1 class="text-center text-decoration-underline">Login</h1>

		<form class="mt-3 mx-auto" style="width: 13.5em;" method="POST" action="/login">
			<label for="email" class="form-label mt-2">Email</label>
			<input type="text" name="email" id="name" class="form-control">

			<label for="password" class="form-label mt-2">Password</label>
			<input type="text" name="password" id="password" class="form-control">

			<button class="btn btn-success rounded mt-4 mx-auto w-100" id="sign">Login</button>
		</form>
	</div>
`

module.exports = {
	signupHTML,  
	loginHTML
}