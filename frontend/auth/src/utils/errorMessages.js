export const mapErrorMessage = (status) => {
	switch (status) {
		case 400:
			return 'Некоректні дані. Перевірте форму.'
		case 401:
			return 'Невірний email або пароль.'
		case 403:
			return 'Доступ заборонено.'
		case 404:
			return 'Не знайдено.'
		case 409:
			return 'Користувач з таким email уже існує.'
		case 500:
			return 'Сталася помилка на сервері. Спробуйте пізніше.'
		default:
			return 'Невідома помилка. Спробуйте ще раз.'
	}
}
