const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('password-confirm')

//Show success and show error for form validation
const showError = (input, message) => {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

const showSuccess = (input) => {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

//Check email against regex
const emailIsValid = (input) => {
	const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (validateEmail.test(input.value.trim())) {
		showSuccess
	} else {
		showError(input, `Please enter a valid email address`)
	}
}

//Get the first letter and cap it for the ID and display as error text
const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Check length for pass and user
const checkInputLength = (input, min, max) => {
	if (input.value.length < min || input.value.length > max) {
		showError(
			input,
			`${getFieldName(
				input
			)} needs to be between ${min} & ${max} characters`
		)
	} else {
		showSuccess(input)
	}
}

//Check password match
const checkPasswordMatch = (input1, input2) => {
	if (input1.value === input2.value) {
		showSuccess
	} else {
		showError(input2, `Passwords do not match`)
	}
}

//Check required fields
const checkRequired = (inputs) => {
	inputs.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`)
		} else {
			showSuccess(input)
		}
	})
}

form.addEventListener('submit', function (e) {
	e.preventDefault()
	checkRequired([username, email, password, passwordConfirm])
	checkInputLength(username, 3, 15)
	checkInputLength(password, 6, 18)
    emailIsValid(email)
    checkPasswordMatch(password, passwordConfirm)
})
